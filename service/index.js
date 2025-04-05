import express from "express";
import { runDockerJob } from "./dockerrunner.js";
import { getDockerStats } from "./stats.js";
import ngrok from "ngrok";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 9123;

const jobs = {};

// Route: Get Docker Usage Stats
app.get("/usage", async (req, res) => {
  try {
    const stats = await getDockerStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
});

// Route: Start a new Docker Job
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

    res.json({ message: `Started job with ID ${id}`, url: jobRunner.url });
  } catch (error) {
    console.error("Error starting job:", error);
    res.status(500).json({ message: "Error starting job", error: error.message });
  }
});

// Route: Stop an existing Docker Job
app.post("/stop/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const job = jobs[id];

    if (!job) {
      return res.status(404).json({ message: `No running job found with ID ${id}` });
    }

    await job.stop();
    delete jobs[id];

    res.json({ message: `Stopped job with ID ${id}` });
  } catch (error) {
    console.error("Error stopping job:", error);
    res.status(500).json({ message: "Error stopping job", error: error.message });
  }
});

// Start the server and ngrok tunnel
app.listen(port, async () => {
  console.log(`Docker Job API running on http://localhost:${port}`);

  try {
    const listener = await ngrok.forward({
      addr: port,
      authtoken: "2vIYyUPC6lrWLbIrJdbhpzNTaeF_3hZZN8o9nSwYyBFVdNJpQ"
  });
    console.log(`ngrok tunnel established at: ${listener.url()}`);
    console.log(`ngrok tunnel established at ${url}`);
  } catch (error) {
    console.error("Error starting ngrok tunnel:", error);
  }
});
