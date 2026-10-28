# MERN Lab Task 1 — CRUD on an Array

A simple CRUD app built with HTML, CSS, browser JavaScript, Express.js and REST API routes. It follows the supplied sketch and uses an in-memory array (no MongoDB needed for this task).

## Run it

1. Install **Node.js** if it is not already installed.
2. Open a terminal in this project folder.
3. Run:

   ```bash
   npm install
   npm start
   ```

4. Open **http://localhost:3000** in your browser.

Do not open `index.html` directly; use the localhost URL so the frontend can call the Express API.

## Features

- **Create:** add an item with its name and price.
- **Read:** show all items in a table.
- **Update:** click Edit, change the values, then click Update.
- **Delete:** click Delete and confirm.
- Starts with two sample rows: Book — ₹250 and Pen — ₹25.

## REST API routes

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/items` | Get all items |
| POST | `/api/items` | Add an item |
| PUT | `/api/items/:id` | Update an item by ID |
| DELETE | `/api/items/:id` | Delete an item by ID |

**Note:** Data is stored in a JavaScript array in `server.js`, so changes reset when the server restarts. This is intentional for an array-based lab task.
