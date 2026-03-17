**VIDEO CONFERENCING WEBSITE :**

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



**Day 2: 22/2/2026**

* Installed necessary packages: express , cors , dotenv
* Created index. js to initialize the Express server, connect to MongoDB, and set up routes.
* Initially tried to connect MongoDB using MongoDB Compass and failed to connect.
* Switched to running a local MongoDB server using the mongod command.
* Managed MongoDB connection URI ( mongodb: //localhost: 27017/video-conferencing ) in the .env file.
* Faced multiple issues related to the .env file not being loaded correctly.
* Implemented steps to fix the environment variable loading issue with dotenv.
* Added authentication routes and controller ( authController.js , authRoutes. js ).
* Created User. js model to manage user data.
* Designed POST routes for registering and logging in users using JWT.
* Created a .gitignore file to exclude node\_modules/ and other unwanted files.
* Used git rm and git add to remove node\_modules/ from Git's tracking.
* Made multiple commits with messages like:

1. "Setup basic Express server structure"
2. "Remove node\_modules from Git tracking"
3. "Added authentication APIs"

* Pushed local changes to GitHub, including authentication APIs and .gitignore adjustments.
* Encountered issues with push related to connectivity but solved it by confirming push was successful.
* Checked the changes on GitHub and confirmed everything was correctly pushed.
* Ensured that all unnecessary files from node\_modules/ were removed from Git's tracking.
* Successfully pushed everything to GitHub and confirmed the changes appeared on the repository.
* Final Outcome :

1. The Express server with authentication APIs is successfully set up.
2. Authentication routes are working, and the server is connected to MongoDB.
3. All changes are now committed and pushed to GitHub.
