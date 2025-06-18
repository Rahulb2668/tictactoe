const GameStats = require("../models/gamestats");

const addStatSEntry = async (req, res) => {
  const { user } = req;
  const { win, loss, draw } = req.body;
  if (win === undefined && loss === undefined && draw === undefined) {
    return res.status(400).send({
      message: "Bad Request",
    });
  }
  const statEntry = await GameStats.findOne({ userId: user._id });

  if (!statEntry) {
    const newStatEnty = new GameStats({
      userId: user._id,
      totalGames: 1,
      wins: win ? 1 : 0,
      losses: loss ? 1 : 0,
      draws: draw ? 1 : 0,
    });

    await newStatEnty.save();
    return res.status(201).send({
      message: "Stat entry created successfully",
      data: newStatEnty,
    });
  }

  statEntry.totalGames += 1;
  if (win) {
    statEntry.wins += 1;
  } else if (loss) {
    statEntry.losses += 1;
  } else if (draw) {
    statEntry.draws += 1;
  }

  const newstatEntry = await statEntry.save();

  res.status(200).send({
    message: "Stat entry updated successfully",
    data: newstatEntry,
  });
};

const getStats = async (req, res) => {
  const { user } = req;
  const statEntry = await GameStats.findOne({ userId: user._id });
  if (!statEntry) {
    return res.status(404).send({
      message: "No entry found",
    });
  }
  res.status(200).send({
    message: "Success",
    data: statEntry,
  });
};

module.exports = {
  addStatSEntry,
  getStats,
};
