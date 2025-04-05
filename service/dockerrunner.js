import { execSync, spawn } from 'node:child_process';
import { appendFileSync, writeFileSync } from 'node:fs';
import { python, nodejs } from './templates/templates.js';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';

export async function runDockerJob(jobId, repository, type, entrypoint) {
  const repoName = repository.split('/').pop().replace('.git', '');
  const clonePath = path.join(os.tmpdir(), 'repos', `${repoName}-${jobId}`);
  //const clonePath = `/repos/${repoName}-${jobId}`;
  const containerName = `container-${jobId}`;
  const networkName = `peercloud-net-${jobId}`;

  if (!fs.existsSync(clonePath)) {
    execSync(`git clone ${repository} ${clonePath}`, { stdio: 'inherit' });
  }

  if(!fs.existsSync(`${clonePath}/Dockerfile`)) {
    let dockerfileContent;
    if (type === 'python') {
      dockerfileContent = python.replace(/CMD\s+\[.*\]/, `CMD ["python", "${entrypoint}"]`);
    } else if (type === 'nodejs') {
      dockerfileContent = nodejs.replace(/CMD\s+\[.*\]/, `CMD ["node", "${entrypoint}"]`);
    } else {
      throw new Error("Unsupported type: Only 'python' and 'nodejs' are supported.");
    }
    
    fs.writeFileSync(path.join(clonePath, 'Dockerfile'), dockerfileContent);
    
  }

  try {
    execSync(`docker network inspect ${networkName}`, { stdio: 'ignore' });
  } catch {
    execSync(`docker network create ${networkName}`, { stdio: 'inherit' });
  }

  const dockerBuildCmd = `docker build -t ${containerName} ${clonePath}`;
  execSync(dockerBuildCmd, { stdio: 'inherit' });

  const run = spawn("docker", [
    "run", "--rm",
    "--network", networkName,
    "--name", containerName,
    `${containerName}`
  ]);

  const ngrok = spawn("docker", [
    "run", 
    "--network", networkName,
    "-p", `${jobId}:4040`,
    "-e", `NGROK_AUTHTOKEN=2mzQ2xid9r3q9cvyrkUjx8B8XEu_6f5LpGx789AytMgSPQnkc`,
    "ngrok/ngrok:latest",
    "http", `${containerName}:3000`
  ]);

  const getNgrokUrl = async () => {
    let retries = 10;
    while (retries > 0) {
      try {
        const res = await fetch(`http://localhost:${jobId}/api/tunnels`);
        const json = await res.json();
        const url = json.tunnels?.find(t => t.proto === "https")?.public_url;
        if (url) return url;
      } catch {}
      retries--;
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    throw new Error("Ngrok tunnel not found after multiple retries.");
  };

  let publicUrl = null;
  try {
    publicUrl = await getNgrokUrl();
    console.log("🌐 Ngrok Public URL:", publicUrl);
  } catch (err) {
    console.error("❌ Failed to get Ngrok URL:", err.message);
  }

  writeFileSync(`${clonePath}/ngrok.txt`, '**NGROK LOGS**\n', 'utf8');
  ngrok.stdout.on("data", (data) => {
    const msg = data.toString();
    console.log(`[ngrok] ${msg}`);
    appendFileSync(`${clonePath}/ngrok.txt`, msg, 'utf8');
    const match = msg.match(/url=(https:\/\/[^\s]+)/);
    if (match) {
      console.log("🔗 Ngrok public URL:", match[1]);
    }
  });

  ngrok.stderr.on("data", (data) => {
    console.error(`[ngrok-error] ${data.toString()}`);
  });

  let logs = "";
  writeFileSync(`${clonePath}/logs.txt`, '**LOGS**\n', 'utf8');
  run.stdout.on("data", (data) => {
    const log = data.toString();
    logs += log;
    appendFileSync(`${clonePath}/logs.txt`, log, 'utf8');
  });

  run.stderr.on("data", (data) => {
    const log = data.toString();
    logs += log;
    appendFileSync(`${clonePath}/logs.txt`, log, 'utf8');
  });

  run.on("close", () => {
    writeFileSync(`${clonePath}/logs.txt`, logs, 'utf8');
    try {
      ngrok.kill('SIGINT');
    } catch (err) {
      console.error("Error stopping Ngrok:", err);
    }
  });

  return {
    url: publicUrl,
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
