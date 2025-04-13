const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middelwares/errorMiddleware");
const locationRoutes = require('./routes/locationRoutes');


//routes path
const authRoutes = require("./routes/authRoutes");

//dotenv
dotenv.config();

//mongo connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 8080;

//API routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1', locationRoutes);
app.use("/api/v1/openai", require("./routes/openaiRoutes"));

app.use(errorHandler);
app.post('/api/v1/save-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log('Received Location:', latitude, longitude);
  // Store in DB if needed
  res.json({ status: 'Location saved' });
});

//listen server
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.DEV_MODE} mode on port no ${PORT}`.bgCyan
      .white
  );
});
