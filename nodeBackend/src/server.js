const express = require("express");
const connectDb = require("./db/database");
const dotenv = require("dotenv");
const cors = require("cors");
const auth = require("./routes/auth");
const gameStats = require("./routes/gameStats");
const { getNextMoveFromAI } = require("./controllers/getNextMove");

dotenv.config();

if (!process.env.NODE_MONGO_DB_URI) {
  throw new Error("MONGO DB URI MISSING");
}
if (!process.env.JWT_SECRET) {
  throw new Error("JWT Secret Missing add it in env ");
}
connectDb();

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello!");
});
app.post("/api/getnextmove", getNextMoveFromAI);

app.use("/api/auth", auth);
app.use("/api/gamestats", gameStats);

app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});

process.on("unhandledRejection", (error) => {
  process.exit(1);
});
