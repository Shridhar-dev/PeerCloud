import { exec } from 'node:child_process';


export function getDockerStats() {
    return new Promise((resolve, reject) => {
      exec('docker stats --no-stream --format "{{.Name}}: {{.CPUPerc}} / {{.MemUsage}} / {{.MemPerc}}"', (error, stdout, stderr) => {
        if (error) {
          reject(`Error: ${error.message}`);
          return;
        }
        if (stderr) {
           reject(`Stderr: ${stderr}`);
           return;
        }
        const stats = stdout.trim().split('\n').map(line => {
          const [name, values] = line.split(': ');
          const [cpuPerc, memUsage, memPerc] = values.split(' / ');
          return { name, cpuPerc, memUsage, memPerc };
        });
        resolve(stats);
      });
    });
  }