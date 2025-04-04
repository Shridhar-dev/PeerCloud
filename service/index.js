import express from "express";
import { runDockerJob } from "./dockerrunner.js";

const app = express();
const port = 9123;

const jobs = {};

app.post("/start/:id", (req, res) => {
  const { id } = req.params;
  if (jobs[id]) {
    return res.status(400).json({ message: `Job with ID ${id} is already running.` });
  }
  const jobRunner = runDockerJob(id);
  jobs[id] = jobRunner;
  res.json({ message: `Started job with ID ${id}` });
});

app.post("/stop/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs[id];
  if (!job) {
    return res.status(404).json({ message: `No running job found with ID ${id}` });
  }
  job.stop();
  delete jobs[id];
  res.json({ message: `Stopped job with ID ${id}` });
});

app.listen(port, () => {
  console.log(`Docker Job API running on http://localhost:${port}`);
});
