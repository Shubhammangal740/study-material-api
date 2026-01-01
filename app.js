const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/ErrorHandling.middleware");
const materialRoutes = require("./routes/material.routes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.json({ message: "Study Material API is running" });
// });

app.use("/api/materials", materialRoutes);

const PORT = process.env.PORT || 5000;

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
