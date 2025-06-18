const axios = require("axios");

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const getNextMoveFromAI = async (req, res) => {
  try {
    const { currentBoard, currentPlayer } = req.body;

    const convrtArr = [
      currentBoard
        .slice(0, 3)
        .map((item) => (item === "X" ? -1 : item === "O" ? 1 : 0)),
      currentBoard
        .slice(3, 6)
        .map((item) => (item === "X" ? -1 : item === "O" ? 1 : 0)),
      currentBoard
        .slice(6, 9)
        .map((item) => (item === "X" ? -1 : item === "O" ? 1 : 0)),
    ];

    console.log("array", convrtArr);
    const response = await axios.post(
      "http://localhost:8000/makemove",
      {
        currentBoard: convrtArr,
        currentPlayer,
      },
      config
    );

    const pos = response.data;
    console.log("s", pos[0] * 3 + pos[1], pos);
    const convertToBoardIndex = pos[0] * 3 + pos[1];

    return res.status(200).send({ data: convertToBoardIndex });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Bad Request");
  }
};

module.exports = {
  getNextMoveFromAI,
};
