const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const connectDB = require("./config/db");
const Product = require("./models/Product");
const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

// Seed data if needed
const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      console.log("Products already exist, skipping seed.");
      return;
    }

    const dataPath = path.join(__dirname, "data", "products.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const products = JSON.parse(rawData);

    await Product.insertMany(products);
    console.log("Sample products seeded successfully.");
  } catch (error) {
    console.error("Error seeding products:", error.message);
  }
};

if (process.argv.includes("--seed")) {
  seedProducts().then(() => {
    console.log("Seeding done. Exiting.");
    process.exit(0);
  });
} else {
  // Routes
  app.get("/", (req, res) => {
    res.send("E-commerce API is running. Use /api/products");
  });

  app.use("/api/products", productRoutes);

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
