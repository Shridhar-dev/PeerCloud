const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const upload = multer({ dest: path.join(__dirname, 'uploads') });
const connectedHosts = [];

wss.on('connection', (ws) => {
  console.log('💻 GPU host connected');
  connectedHosts.push(ws);

  ws.on('close', () => {
    const index = connectedHosts.indexOf(ws);
    if (index !== -1) connectedHosts.splice(index, 1);
    console.log('🔌 GPU host disconnected');
  });
});

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  const originalName = req.file.originalname;
  const code = fs.readFileSync(filePath, 'utf-8');

  if (connectedHosts.length === 0) {
    return res.status(503).send('❌ No GPU host available');
  }

  const job = {
    type: 'job',
    filename: originalName,
    code,
  };

  connectedHosts[0].send(JSON.stringify(job)); // send to 1st connected host
  res.send('✅ Job dispatched to a GPU host');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload.html'));
});

const HOST_IP = '172.27.48.204'; // Replace this with your actual local IP

server.listen(3000, HOST_IP, () => {
  console.log(`🚀 Server listening on`);
    console.log(`http://${HOST_IP}:3000`);
});
