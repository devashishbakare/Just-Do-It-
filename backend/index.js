const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const db = require("./config/mongoose");
db();
app.use(cors());
app.use(express.json());
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error in connecting to a server");
  }
  console.log(`App running on port ${process.env.PORT}`);
});
