require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(express.json());
app.get("/test-events", (req, res) => {
  res.send("Direct test route working!");
});
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Event Management API is running"
    });
});

const PORT = 3000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

startServer();