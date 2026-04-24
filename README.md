# 🚀 AI-Powered Multimodal Campus Safety & Surveillance System

An end-to-end AI system that detects safety threats in real time by combining **computer vision** and **audio analysis**.  
The system uses **YOLOv5** for visual detection and **MFCC + RNN** for audio-based anomaly detection, with a **FastAPI backend** and **React frontend**.

---
Deployed on aws  http://3.26.241.173:3000/
## 🎯 Key Features

- 🔍 **Real-time Threat Detection**
  - Violence detection using YOLOv5 (CV)
  - Audio anomaly detection using MFCC + RNN

- ⚡ **Low Latency Alerts**
  - FastAPI backend with async processing
  - Alerts generated within <2 seconds

- 📊 **Live Monitoring Dashboard**
  - React-based UI for real-time visualization
  - Alert overlays and incident tracking

- ☁️ **Cloud Deployment**
  - Backend deployed on AWS EC2
  - Frontend served via build (or S3 optional)

---

## 🏗️ Tech Stack

### 🔹 Backend
- FastAPI
- Python
- YOLOv5
- Librosa (MFCC)
- RNN (TensorFlow / PyTorch)

### 🔹 Frontend
- React.js (Vite)

### 🔹 Database
- PostgreSQL

### 🔹 DevOps / Tools
- AWS EC2
- Git & GitHub

---

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/rohinsekar00/AI-Powered-Multimodal-Campus-Safety-Surveillance-System
cd AI-Powered-Multimodal-Campus-Safety-Surveillance-System

Backend Setup (FastAPI)
🔹 Step 1: Navigate
cd backend
🔹 Step 2: Create Virtual Environment
python3 -m venv venv
source venv/bin/activate   # Linux/Mac
# venv\Scripts\activate    # Windows
🔹 Step 3: Install Dependencies
pip install -r requirements.txt

👉 If requirements.txt is missing:

pip install fastapi uvicorn torch torchvision librosa numpy
🔹 Step 4: Run Backend Server
uvicorn main:app --host 0.0.0.0 --port 8000
🔹 Backend URL
http://localhost:8000
http://localhost:8000/docs   (Swagger UI)
🌐 Frontend Setup (React - Vite)
🔹 Step 1: Navigate
cd frontend/frontend
🔹 Step 2: Install Node Modules
npm install
🔹 Step 3: Run Development Server
npm run dev

👉 Open:

http://localhost:5173
🔹 Step 4: Build for Production
npm run build
🔹 Step 5: Serve Build
npm install -g serve
serve -s dist -l 3000

👉 Open:

http://localhost:3000
☁️ AWS Deployment (EC2)
🔹 Backend
uvicorn main:app --host 0.0.0.0 --port 8000
🔹 Frontend
serve -s dist -l 3000
🔓 Open Ports (IMPORTANT)
Service	Port
Backend	8000
Frontend	3000

👉 Add in EC2 Security Group:

Type: Custom TCP
Source: 0.0.0.0/0
🌍 Access
http://<your-ec2-ip>:3000
⚠️ Important Notes
Large model files (YOLO weights) are not included in repo
Use CPU version of PyTorch for EC2 free tier
Avoid pushing .env, datasets, or model weights
🚧 Future Improvements
Docker containerization
CI/CD pipeline (GitHub Actions)
Nginx reverse proxy
Real-time streaming via WebSockets
👨‍💻 Author

Rohin S
📧 rohinsekar03@gmail.com

🔗 https://github.com/rohinsekar00

⭐ If you like this project

Give it a ⭐ on GitHub!


