const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
//import routes
const authRoutes = require("./src/routes/authRoutes");
const studentRoutes = require("./src/routes/studentRoutes");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/student", studentRoutes);


app.listen(3001, () => console.log("Server is Running on port 3001"));