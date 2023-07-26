const express = require("express");
const app = express();

const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
dotenv.config();
const cors = require("cors");
const authMiddleware = require("./config/authMiddleware");
const db = require("./config/mongoose");
db();

app.set("view engine", "ejs");
app.set("views", "./views/mailers");
app.use(
  session({
    secret: process.env.MONGO_STORE_SECREAT_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 14 * 24 * 60 * 60,
    }),
  })
);

app.use(cors());
app.use(express.json());
app.use(authMiddleware);
app.use("/", require("./routes/index"));

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error in connecting to a server");
  }
  console.log(`App running on port ${process.env.PORT}`);
});
