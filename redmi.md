# Sweets Shop — Fullstack Project

> A delicious, modern full‑stack application: **sweets-api** (Node.js + Express + MongoDB) + **sweets-shop** (React + Vite + Tailwind CSS).

---

## 🍬 Overview

This project contains two folders at the repo root:

- `sweets-api` — RESTful backend built with Node.js, Express and MongoDB. Implements user auth (JWT), sweets CRUD, inventory operations (purchase / restock), and role‑based admin actions.
- `sweets-shop` — Frontend single page application built with React, Vite and Tailwind CSS. Users can register/login, browse sweets, search & filter, purchase items, and (for admin) manage sweets.

Both folders include a `.env.example` file — copy it to `.env` and fill values before running.

---

## 🚀 Quick Start

> Clone the repository, then run the following **in two separate terminals** (or run them with your preferred process manager):

```bash
# 1. Install dependencies for both folders
cd sweets-api
npm i
cd ../sweets-shop
npm i
```

```bash
# 2. Prepare environment files
# For each folder: copy .env.example to .env and edit values
cp sweets-api/.env.example sweets-api/.env
cp sweets-shop/.env.example sweets-shop/.env
# Edit the .env files with your values (see .env.example for keys)
```

```bash
# 3. Run the backend (development with nodemon)
cd sweets-api
npm run dev   # starts nodemon (dev) -> uses `npm run dev`
# OR start production style
npm start     # starts node
```

```bash
# 4. Run the frontend
cd ../sweets-shop
npm run dev   # starts Vite dev server (frontend)
```

Visit the frontend URL printed by Vite (usually http://localhost:5173) and the API at the backend URL configured in `.env` (e.g. http://localhost:5001).

---

## ✅ Features

### Backend (sweets-api)
- RESTful API built with Express and MongoDB (Mongoose).
- User authentication (register + login) with password hashing and JWT tokens.
- Role based access: `user` and `admin`.
- Sweets endpoints (protected): create, read, search, update, delete (admin only).
- Inventory endpoints (protected): purchase (decrements quantity), restock (admin only increases quantity).
- Validation, error handling and pagination support for lists.

Each sweet contains: `id`, `name`, `category`, `price`, `quantity` (and optional `description`, `imageUrl`).

### Frontend (sweets-shop)
- React + Vite SPA using Tailwind CSS for modern responsive UI.
- Register & Login forms with token storage (localStorage) and auth-protected UI.
- Dashboard/homepage showing paginated sweets list.
- Search & filter by name, category, price range.
- Purchase button (disabled when quantity = 0).
- Admin UI to add / edit / delete sweets and restock inventory.

---

## 🧾 API Reference (important endpoints)

Base URL: configured in `sweets-api/.env` as `PORT` / `BASE_URL` (example: `http://localhost:5001`).

### Auth
- `POST /api/auth/register` — register
  - body: `{ username, email, password }`
- `POST /api/auth/login` — login
  - body: `{ email, password }`
  - returns JWT token: include on protected routes as `Authorization: Bearer <token>`

### Sweets (Protected — token required)
- `POST /api/sweets` — Add a new sweet (admin)
  - body: `{ name, category, price, quantity, description?, imageUrl? }`
- `GET /api/sweets` — List all sweets (supports `page`, `limit`)
- `GET /api/sweets/search` — Search sweets
  - query params: `q` (name), `category`, `minPrice`, `maxPrice`, `page`, `limit`
- `PUT /api/sweets/:id` — Update sweet (admin)
- `DELETE /api/sweets/:id` — Delete sweet (admin)

### Inventory (Protected)
- `POST /api/sweets/:id/purchase` — Purchase a sweet (decreases quantity by 1 or by `amount` if provided)
  - body (optional): `{ amount: 1 }`
- `POST /api/sweets/:id/restock` — Restock a sweet (admin only, increases quantity)
  - body: `{ amount: 10 }`


---

## 🔐 Environment Variables (examples)

### sweets-api/.env.example
```
PORT=5001
MONGO_URI=mongodb://localhost:27017/sweetsdb
JWT_SECRET=your_jwt_secret_here
```

### sweets-shop/.env.example
```
VITE_API_BASE_URL=http://localhost:5001/api
```

Make sure to replace `MONGO_URI` with your real MongoDB connection string (Atlas or local).

---

## 🧪 Tests & Test Report

- Backend tests: placed in `sweets-api/tests` (Jest + Supertest recommended).
  - Run: `cd sweets-api && npm test`
- Frontend tests: (React Testing Library)
  - Run: `cd sweets-shop && npm test`

**What to include in the test report**
- Summary of test suites run (backend and frontend).
- Number of tests passed/failed, coverage summary.
- Example (insert real results after you run tests):

```
Backend tests: 18 passed, 0 failed. Coverage: 92% lines.
Frontend tests: 12 passed, 0 failed. Coverage: 88% lines.
```

Add the generated test report output or screenshots to this README in the `./screenshots` folder.

---

## ⚙️ Admin Setup & Seeding

To create an initial admin user quickly, either:
1. Use an API route `POST /api/auth/register` then update the user role to `admin` in MongoDB.
2. Add a seed script `sweets-api/seedAdmin.js` that creates an admin user when run. Example:

```bash
node seedAdmin.js
```

Seed script should read `MONGO_URI` from `.env` and create a user with `{ username: 'admin', email: 'admin@example.com', password: 'password', role: 'admin' }`.

---

## 📸 Screenshots

Include screenshots in `/screenshots` and add them here:

- `screenshots/user-home.png` — homepage
- `screenshots/admin-dashboard.png` — dashboard
- `screenshots/sweet-form.png` — sweet detail modal
- `screenshots/login.png` — login

Add images like:

```markdown
![Home](/screenshots/user-home.png)
```

---


---

## 🧾 My AI Usage

I used AI assistance from ChatGPT (OpenAI) and Gemini (Google) to:
- Generate a polished, structured README template and example scripts.
- Draft API reference and sample environment variable files.

AI helped speed up writing the README content and provided ideas for structure and testing. (If this repo is submitted for any course or evaluation check your instructor rules before using AI-generated text; attribute where required.)

---

## 🛠️ Scripts (recommended in package.json)

### sweets-api/package.json (recommended scripts)
```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js",
    "test": "jest --coverage"
  }
}
```

### sweets-shop/package.json (recommended scripts)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

---

## 🧭 Postman / API Collection

Include a Postman collection (or `insomnia` file) named `sweets_api_postman_collection.json` at the repo root containing sample requests for: register, login, create sweet, list sweets, search sweets, purchase, restock. This makes manual testing quick for reviewers.

---


## 📞 Contact

If you need help with wiring up the backend or the frontend, seeding admin users, or writing tests, open an issue in the repo and I’ll respond.

---

*Happy coding — and may your sweets never run out!* 🎂

