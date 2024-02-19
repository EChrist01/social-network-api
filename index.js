const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

// Start server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Connect to MongoDB and start server
db.once("open", () => {
  console.log("Connected to MongoDB");
  startServer();
});

// Handle MongoDB connection error
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
