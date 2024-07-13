const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes/routes.js");

dotenv.config();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors())

app.use("/express", router);

const port = process.env.DB_PORT ;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server Running on Port http://localhost:${port}`);
});
