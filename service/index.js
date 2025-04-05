import express from "express";
import { runDockerJob } from "./dockerrunner.js";
import { getDockerStats } from "./stats.js";
import path from "node:path";
import { spawn } from "node:child_process";
import * as readline from "node:readline";
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 9123;
const jobs = {};

// ✅ Use execPath directory instead of __dirname for pkg compatibility
const execDir = path.dirname(process.execPath);

// Start ngrok programmatically
let publicUrl = null;

function startNgrok() {
  return new Promise((resolve, reject) => {
    const ngrokPath = path.join(execDir, "ngrok.exe"); // ✅ fixed path
    const authtoken = "2vIYyUPC6lrWLbIrJdbhpzNTaeF_3hZZN8o9nSwYyBFVdNJpQ";

    const ngrokProcess = spawn(ngrokPath, [
      "http",
      port,
      "--authtoken", authtoken,
      "--log=stdout"
    ]);

    const rl = readline.createInterface({ input: ngrokProcess.stdout });

    let resolved = false;

    rl.on("line", (line) => {
      const match = line.match(/url=(https:\/\/[^\s]+)/);
      if (match && !resolved) {
        const url = match[1];
        resolved = true;
        resolve({ process: ngrokProcess, url });
      }
    });

    ngrokProcess.stderr.on("data", (data) => {
      console.error(`ngrok error: ${data}`);
    });

    ngrokProcess.on("error", (error) => {
      reject(error);
    });

    ngrokProcess.on("exit", (code) => {
      console.log(`ngrok process exited with code ${code}`);
    });
  });
}

// Route: Get Docker Usage Stats
app.get("/usage", async (req, res) => {
  try {
    const stats = await getDockerStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats" });
  }
});

app.post("/start/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { repository, type, entrypoint } = req.body;

    if (jobs[id]) {
      return res.status(400).json({ message: `Job with ID ${id} is already running.` });
    }

    const jobRunner = await runDockerJob(id, repository, type, entrypoint);
    jobs[id] = jobRunner;
    console.log("Job started:", jobRunner);

    res.json({ message: `Started job with ID ${id}, url: ${publicUrl}` });
  } catch (error) {
    console.error("Error starting job:", error);
    res.status(500).json({ message: "Error starting job", error: error.message });
  }
});

// Route: Stop an existing Docker Job
app.post("/stop/:id", async (req, res) => {
  const { id } = req.params;

  if (!jobs[id]) {
    return res.status(404).json({ message: `No job found with ID ${id}.` });
  }

  try {
    await jobs[id].stop();
    delete jobs[id];
    res.json({ message: `Stopped job with ID ${id}` });
  } catch (error) {
    console.error("Error stopping job:", error);
    res.status(500).json({ message: "Error stopping job", error: error.message });
  }
});

// ✅ Start everything
startNgrok().then(({ url }) => {
  publicUrl = url;
  console.log("Public URL:", publicUrl);

  app.listen(port, () => {
    console.log(`Server is running at ${publicUrl}`);
  });
}).catch((err) => {
  console.error("Failed to start ngrok:", err);
});
