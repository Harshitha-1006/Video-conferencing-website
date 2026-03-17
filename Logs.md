**VIDEO CONFERENCING WEBSITE :**

**Day 1: 22/2/2026**

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





**Day 2: 23/2/2026**

* Setup basic Node + Express server in /server/index.js
* Added express, cors, and mongoose dependencies
* Configured JSON middleware and CORS
* Created .env file (local, not pushed) with:
* MONGO\_URI=mongodb://localhost:27017/video\_conferencing
* PORT=5000
* JWT\_SECRET=Sirak@450
* Verified MongoDB connection works locally
* Created backend folder structure:

&#x09;controllers/ → authController.js

&#x09;models/ → User.js and Room.js

&#x09;routes/ → authRoutes.js and roomRoutes.js

&#x09;middleware/ → authMiddleware.js (JWT authentication)

* Implemented authentication system:
* POST /api/auth/register → user registration with hashed password (bcrypt)
* POST /api/auth/login → login with JWT token issuance
* Implemented Room model and basic room routes
* Tested server with Node → confirmed server runs and connects to MongoDB
* Verified .env loads correctly using dotenv package
* Logged debug outputs to ensure environment variables (MONGO\_URI, PORT) are working
* Confirmed server listens on port 5000
* Added authMiddleware to protect API routes (JWT verification)
* Tested backend functionality using Node + logs (before frontend integration)
* Added all implemented files to git staging (except .env)
* Committed changes with message: "Week 1: Auth system, JWT middleware, Room model and routes"
* Pushed commit to feature/auth-system branch
* PR merge to develop confirmed → Week 1 backend work now safely on develop





**Day 3: 17/3/2026**

* Verified backend functionality using Thunder Client in VS Code:
* Tested POST /api/auth/register → successfully registered new users
* Tested POST /api/auth/login → received JWT token upon valid login
* Tested protected routes (e.g., /api/rooms) with JWT in Authorization header → access granted
* Confirmed MongoDB connection still working correctly during API tests
* Checked server logs → all requests handled correctly, no errors
* Ensured .env is not committed to repository for security
* Reviewed branch structure: feature/auth-system merged into develop → all Week 1 backend work safely on GitHub
* Confirmed server runs on port 5000, API endpoints reachable locally
* Made final commits for Week 1 backend work (auth system, JWT middleware, room model/routes)
* Documented changes in Logs.md for Week 1
* Checked git status → working tree clean, branch up to date with origin/develop
* Week 1 backend ownership (auth + DB) fully complete

