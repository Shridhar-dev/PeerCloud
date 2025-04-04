const WebSocket = require("ws");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// const ws = new WebSocket('ws://localhost:3000');
const ws = new WebSocket("ws://172.27.48.204:3000");

ws.on("open", () => {
  console.log("✅ Connected to server");
});

ws.on("message", async (data) => {
  const message = JSON.parse(data);

  if (message.type === "job") {
    const { code, filename } = message;
    const filePath = path.join(__dirname, filename);
    fs.writeFileSync(filePath, code); // Save file

    console.log(`🚀 Running job: ${filename}`);

    const python = spawn("bash", [
      "-c",
      `source ~/miniforge3/bin/activate && python3 ${filePath}`,
    ]);

    // Send stdout data to server
    python.stdout.on("data", (data) => {
      console.log(`stdout: ${data}`);
      ws.send(JSON.stringify({ type: "log", content: data.toString() }));
    });

    // Send stderr data to server
    python.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      ws.send(JSON.stringify({ type: "error", content: data.toString() }));
    });

    // On close
    python.on("close", (code) => {
      console.log(`child process exited with code ${code}`);
      ws.send(JSON.stringify({ type: "done", code }));
    });
    ws.send(JSON.stringify({
        type: 'log',
        content: `[${new Date().toLocaleTimeString()}] ${data.toString()}`
      }));
  }
});



  