# WebRTC Mediasoup Video App (Work In Progress)

This project is a full-stack WebRTC application using:

- **React (Vite)** for the frontend
- **Node.js + Express**
- **Socket.io**
- **Mediasoup** as the SFU (Selective Forwarding Unit)

---

## 🚀 Current Progress

✅ Mediasoup Worker created  
✅ Mediasoup Router created  
✅ Socket.io signaling established  
✅ Frontend connected to backend  
✅ Router RTP Capabilities successfully fetched from server  

The frontend and backend are successfully communicating.

---

## 🏗 Project Structure
WEBRTC/
├── client/ # React frontend (Vite)
└── server/ # Node.js backend with Mediasoup

---

## 🖥 Backend (Server)

Location:

### Features Implemented

- Mediasoup Worker initialization
- Mediasoup Router creation
- Socket.io signaling setup
- Event: `getRouterRtpCapabilities`

### Run Backend
cd server
npm install
node index.js
Server runs on:


---

## 🌐 Frontend (Client)

Location:
/client


### Features Implemented

- React app created with Vite
- Socket.io client connection
- Fetching router RTP capabilities from backend
- MeetingRoom component created

### Run Frontend
cd client
npm install
npm run dev


Frontend runs on:
http://localhost:5173


---

## 🔄 Current Signaling Flow

1. Frontend connects to backend via Socket.io
2. Frontend emits `getRouterRtpCapabilities`
3. Backend responds with Mediasoup router RTP capabilities
4. Frontend logs capabilities in browser console

---

## 📌 Next Steps (Planned)

- Initialize mediasoup-client device
- Create send transport
- Capture local camera stream
- Produce video
- Implement full room join logic
- Add UI improvements

---

## 🛠 Tech Stack

- React (Vite)
- Node.js
- Express
- Socket.io
- Mediasoup

---

## ⚠️ Notes

- `node_modules` are excluded via `.gitignore`
- Development build only (not production-ready)
- React StrictMode may log events twice in development

---

## 👨‍💻 Status

Project is in active development.
This is the foundational signaling layer for a WebRTC SFU-based video meeting application.
