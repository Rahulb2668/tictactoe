const router = require("express").Router();
const {
  addStatSEntry,
  getStats,
} = require("../controllers/gameStatsController");
const authMiddleware = require("../middelware/authMiddleware");

router.post("/", authMiddleware, addStatSEntry);
router.get("/", authMiddleware, getStats);

module.exports = router;
