# E-commerce App using MERN Stack

A simple **E-commerce web application** built using the MERN stack:

- **MongoDB** – product data storage
- **Express.js** – REST API backend
- **React (Vite)** – frontend UI
- **Node.js** – server runtime

This project is designed as a beginner-friendly, portfolio-ready example of a MERN application.  
It includes a product listing page, product details page, and a shopping cart (stored in the browser).

---

## ✨ Features

- View all products
- View single product details
- Add/remove items from cart
- Cart stored in browser (local state)
- REST API for products (`/api/products`)
- MongoDB + Mongoose for product storage
- Clean folder structure for MERN projects

---

## 🧱 Project Structure

```text
ecommerce-mern-app/
├── README.md
├── .gitignore
├── server/
│   ├── package.json
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   └── data/
│       └── products.json
└── client/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api.js
        ├── styles.css
        ├── context/
        │   └── CartContext.jsx
        └── components/
            ├── Navbar.jsx
            └── ProductCard.jsx
```

---

## 🚀 Getting Started

You need:
- **Node.js 16+**
- A **MongoDB URI** (local MongoDB or MongoDB Atlas)

### 1️⃣ Backend Setup (server)

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce_db
PORT=5000
```

> Change `MONGO_URI` to your MongoDB connection string if using Atlas.

Seed initial products (optional step, one-time):

```bash
node server.js --seed
```

Then start the backend API:

```bash
npm start
```

The API will run at: **http://localhost:5000**

### 2️⃣ Frontend Setup (client)

In another terminal:

```bash
cd client
npm install
npm run dev
```

Vite dev server will start (usually at **http://localhost:5173**).  
The frontend is configured to talk to the backend at `http://localhost:5000`.

---

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api/products`

- `GET /api/products` → Get all products
- `GET /api/products/:id` → Get a single product by ID

---

## 🧩 Ideas to Extend

- Add authentication (login, register) using JWT
- Add order creation and checkout flow
- Add admin dashboard to create/update products
- Integrate online payments (Razorpay / Stripe)
- Deploy backend (Render/Railway) and frontend (Vercel/Netlify)

---

## 📜 License

This project is created for learning and portfolio use.
Feel free to fork, modify, and showcase it in your GitHub and resume.
