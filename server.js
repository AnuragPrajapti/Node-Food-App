const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");

// dotenv configuration
dotenv.config();

//DB connection
connectDb();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/vi/auth", require("./routes/authRoutes"));
app.use("/api/vi/user", require("./routes/userRoutes"));
app.use("/api/vi/resturant", require("./routes/resturantRoutes"));
app.use("/api/vi/category", require("./routes/categoryRoutes"));

app.get("/get", (req, res) => {
  res.send("Data get Successfully!");
});

// PORT
const PORT = process.env.PORT || 8001;

//LISTEN
app.listen(PORT, () => console.log(`Server running ${PORT}`));
