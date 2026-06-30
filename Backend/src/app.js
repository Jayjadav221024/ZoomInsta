const express = require("express");
const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authroutes = require("./routes/authroute");
const foodroutes = require("./routes/foodroute");
const foodpartnerroute = require("./routes/foodpartner");

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:4000", "http://localhost:5000","https://zoominsta-2.onrender.com",],
  credentials: true,
}));

// API routes first
app.use("/auth", authroutes);
app.use("/food", foodroutes);
app.use("/foodpartner", foodpartnerroute);

// Frontend static
// app.use(express.static(path.join(__dirname, "../public/dist")));

// // React fallback last
// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/dist/index.html"));
// });
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend running successfully",
  });
});

module.exports = app;
