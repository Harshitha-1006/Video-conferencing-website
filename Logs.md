**VIDEO CONFERENCING WEBSITE :**

**WEEK 1:**
**Day 1: 21/2/2026**

* GitHub repo created by Harshitha: Video-conferencing-website
* I created README.md file in root
* Created branches :
1. main : Original stable branch
2. develop	: Integration branch for team
3. feature/auth-system : My working branch for authentication system
* develop branch and feature/auth-system branch created locally and pushed to GitHub



* Inside the repo :

Video-conferencing-website/

│

├── client/         # React frontend (empty for now)

├── server/         # Node + Express backend (empty for now)

├── docs/           # Documentation



* Added .gitkeep file in each folder so Git can track empty directories
* Committed and pushed to feature/auth-system
* Repository cloned locally on machine
* feature/auth-system branch is active
* Ready to start backend setup in /server tomorrow


**Day 2: 22–23/2/2026 – Backend Setup & Auth System**

Installed required packages: express, cors, dotenv, mongoose, bcrypt, jsonwebtoken
Created server/index.js:
Initialized Express server
Configured JSON middleware and CORS
Connected to MongoDB (mongodb://localhost:27017/video_conferencing) using dotenv
Faced and resolved issues with .env loading
Tested MongoDB connection locally (switched from Compass to mongod when needed)
Created backend folder structure:
server/
├── controllers/ → authController.js
├── models/ → User.js, Room.js
├── routes/ → authRoutes.js, roomRoutes.js
├── middleware/ → authMiddleware.js (JWT verification)

Implemented authentication system:
POST /api/auth/register → user registration with hashed password
POST /api/auth/login → login with JWT token issuance
Implemented Room model and basic room routes
Added authMiddleware to protect routes
Created .gitignore to exclude node_modules and other unnecessary files
Removed node_modules from Git tracking
Verified server runs on port 5000, API endpoints reachable locally
Tested functionality using Node logs and Thunder Client:
Registered new users
Logged in and received JWT tokens
Accessed protected routes with JWT in Authorization header
Multiple commits made:
"Setup basic Express server structure"
"Remove node_modules from Git tracking"
"Added authentication APIs"
"Week 1: Auth system, JWT middleware, Room model and routes"
Pushed changes to feature/auth-system
Merged feature/auth-system into develop → Week 1 backend work safely on GitHub
Ensured .env not committed for security



**Day 3: 17/3/2026 – Verification & Documentation**

Verified backend functionality thoroughly using Thunder Client
Confirmed:
MongoDB connection stable
Auth routes working as expected
Protected routes accessible with JWT
Checked server logs → no errors
Git status clean; branch up to date with origin/develop
Documented Week 1 backend work in Logs.md
Week 1 backend ownership (auth system + DB) fully complete


**Week 2 – Backend & Room/Signaling Tasks**

**Day 4: 18-Mar-2026**

Tasks Completed:
Socket & Room Setup
Created socket/index.js to manage rooms and participants.
Implemented joinRoom, disconnect, and participant tracking.
Added role handling (host / participant) for permissions.
Transport & Media Events (Dummy Implementation)
Added createTransport event (dummy transport info for now).
Added produce event to send media stream info to server.
Added consume event to receive media stream info.
Frontend Integration (React)
Created src/pages/MeetingRoom.jsx to handle local video/audio.
Connected to socket server and emitted events.
Displayed local camera feed; added placeholders for remote feeds.
Testing
Verified socket events with testSocket.js and frontend console logs.
Confirmed produce / consume / createTransport events working.
Room join/disconnect logic tested with multiple socket clients.

**WEEK 3 – Backend File Sharing System**

**Day 5: 29/03/2026**

Created feature/file-sharing branch for backend file-sharing functionality.
Implemented File model (File.js) for uploaded file metadata.
Added Multer middleware (uploadMiddleware.js) for handling file uploads to server/uploads/.
Created file routes (fileRoutes.js) and controller (fileController.js) for upload/download APIs.
Added .gitignore to exclude server/node_modules/.
Committed and pushed feature/file-sharing branch to GitHub.
Pulled latest develop branch and merged updates; pushed changes to remote.
Tested file upload/download endpoints; verified files are saved correctly and metadata stored in MongoDB.
Verified branches:
feature/file-sharing → all Week 3 backend files present
develop → updated and synced with remote