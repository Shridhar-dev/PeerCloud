import { execSync, spawn } from 'node:child_process';
import { appendFileSync, writeFileSync } from 'node:fs';

export async function runDockerJob(jobId, env) {
  const containerName = `container-${jobId}`;
  const networkName = 'peercloud-net';
  const buildContext = './repos/node-server';

  try {
    execSync(`docker network inspect ${networkName}`, { stdio: 'ignore' });
  } catch {
    execSync(`docker network create ${networkName}`, { stdio: 'inherit' });
  }

  const dockerBuildCmd = `docker build -t ${containerName} ${buildContext}`;
  execSync(dockerBuildCmd, { stdio: 'inherit' });

  const run = spawn("docker", [
    "run", "--rm",
    "--network", networkName,
    "--name", containerName,
    `${containerName}`
  ]);

  const ngrok = spawn("docker", [
    "run", "--rm",
    "--network", networkName,
    "-p", "4040:4040",
    "-e", `NGROK_AUTHTOKEN=${process.env.NGROK_AUTH_TOKEN || '2mzQ2xid9r3q9cvyrkUjx8B8XEu_6f5LpGx789AytMgSPQnkc'}`,
    "ngrok/ngrok:latest",
    "http", `${containerName}:3000`
  ]);

  const getNgrokUrl = async () => {
    let retries = 10;
    while (retries > 0) {
      try {
        const res = await fetch("http://localhost:4040/api/tunnels");
        const json = await res.json();
        const url = json.tunnels?.find(t => t.proto === "https")?.public_url;
        if (url) return url;
      } catch {}
      retries--;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    throw new Error("Ngrok tunnel not found after multiple retries.");
  };

  try {
    const publicUrl = await getNgrokUrl();
    console.log("🌐 Ngrok Public URL:", publicUrl);
  } catch (err) {
    console.error("❌ Failed to get Ngrok URL:", err.message);
  }

  writeFileSync(`${buildContext}/ngrok.txt`, '**NGROK LOGS**\n', 'utf8');
  ngrok.stdout.on("data", (data) => {
    const msg = data.toString();
    console.log(`[ngrok] ${msg}`);
    appendFileSync(`${buildContext}/ngrok.txt`, msg, 'utf8');
    const match = msg.match(/url=(https:\/\/[^\s]+)/);
    if (match) {
      console.log("🔗 Ngrok public URL:", match[1]);
    }
  });

  ngrok.stderr.on("data", (data) => {
    console.error(`[ngrok-error] ${data.toString()}`);
  });

  let logs = "";
  writeFileSync(`${buildContext}/logs.txt`, '**LOGS**\n', 'utf8');
  run.stdout.on("data", (data) => {
    const log = data.toString();
    logs += log;
    appendFileSync(`${buildContext}/logs.txt`, log, 'utf8');
  });

  run.stderr.on("data", (data) => {
    const log = data.toString();
    logs += log;
    appendFileSync(`${buildContext}/logs.txt`, log, 'utf8');
  });

  run.on("close", () => {
    writeFileSync(`${buildContext}/logs.txt`, logs, 'utf8');
    try {
      ngrok.kill('SIGINT');
    } catch (err) {
      console.error("Error stopping Ngrok:", err);
    }
  });

  return {
    stop: () => {
      try {
        console.log(`Stopping container: ${containerName}`);
        execSync(`docker stop ${containerName}`, { stdio: 'inherit' });
      } catch (err) {
        console.error(`Error stopping container: ${err.message}`);
      }
    }
  };
}
