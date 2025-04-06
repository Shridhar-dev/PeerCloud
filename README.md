# 🧠 PeerCloud

### Your devices. Your cloud.

PeerCloud turns your laptop into a rentable microserver — a decentralized alternative to cloud computing platforms. Run containerized jobs, expose them securely via ngrok, and get paid for sharing compute — all without leaving your desk.

---

## 🚀 What is PeerCloud?

PeerCloud is a peer-to-peer cloud infrastructure platform that enables people to rent out their unused system resources. Whether you're a developer running microservices or someone looking to monetize idle CPU power, PeerCloud bridges the gap between demand and availability — no data centers, no middlemen.

---

## 🛠 Features

- 🐳 Docker-powered: Runs isolated, secure containers for every job.
- 🌐 Dynamic Public URLs: Uses ngrok to expose services securely from localhost.
- ⚡ Plug-n-Play: Just run the script — PeerCloud handles setup, networking, and teardown.
- 🔐 Zero Vendor Lock-in: Everything runs on your system. You own the hardware, and the cloud.

---

## 💡 Use Cases

- Renting compute for short-lived jobs (like running bots, testing APIs, etc.)
- Running microservices in a local cloud-like environment
- Crowdsourced compute for AI/ML tasks
- Learning cloud concepts using real infrastructure

---

## 🧰 Tech Stack

- Node.js (Orchestrator)
- Docker (Container Runtime)
- ngrok (Tunneling)
- Git (Repo Cloning & Entrypoint Setup)

---

## 🧪 How It Works

1. Submit a GitHub repo and entrypoint.
2. PeerCloud clones the repo, builds a Docker container, and runs it.
3. ngrok exposes the container on a public URL (https).
4. Logs are streamed and available in real-time.

---

## ⚙️ Requirements

- Docker
- Node.js (v18+)
- ngrok account + authtoken (free)
- A modern OS (Windows, macOS, or Linux)

---

## 🧾 Example API Usage

```bash
POST /run
{
  "jobId": "2122",
  "repository": "https://github.com/user/example-node-api.git",
  "type": "nodejs",
  "entrypoint": "index.js"
}