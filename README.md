# MERN Lab Task 1 
MERN Lab Task 1 — CRUD Operations on an Array
Output Links
- Live Website (CRUD App): https://mern-crud-lab.onrender.com/
- Live REST API Output (JSON): https://mern-crud-lab.onrender.com/api/items
- GitHub Repository: https://github.com/ashleshvnayak77-byte/mern-crud-lab
Project Description
A simple CRUD application built using HTML, CSS, JavaScript, Express.js, and REST API routes. It manages items using a JavaScript array, as required by the lab task. MongoDB is not used.
Features
- Create: Add an item with a name and price.
- Read: View all items in a table.
- Update: Edit an existing item.
- Delete: Remove an item.
The table displays each item's ID, name, and price, along with Edit and Delete actions.

# How to Run Locally
1. Install Node.js (LTS): https://nodejs.org/
2. Open a terminal in this project folder.
3. Install the dependencies:
   npm install
4. Start the server:
   npm start
5. Open http://localhost:3000 in your browser.
Do not open public/index.html directly. Use the localhost URL so the frontend can communicate with the Express API.
REST API Endpoints
Method	Endpoint	Purpose
GET	/api/items	Get all items
POST	/api/items	Add a new item
PUT	/api/items/:id	Update an item by ID
DELETE	/api/items/:id	Delete an item by ID


Project Files
- server.js — Express server and REST API
- public/index.html — form and items table
- public/style.css — page styling
- public/script.js — frontend CRUD requests and interactions
- package.json — project setup and run commands
- render.yaml — Render deployment configuration
Note About Data
Items are stored in an in-memory JavaScript array in server.js. Data may reset when the server restarts. This is intentional for this array-based lab task.
