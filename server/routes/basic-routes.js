const express = require("express");
const router = express.Router();
const Lobby = require("../lobby");

router.get("/list-all-lobbies", (req, res) => {
  res.status(200).json({ rooms: Lobby._getAllRooms() });
});

router.post("/create-lobby", (req, res) => {
  try {
    const createdRoom = Lobby._createRoom(req.body);

    if (!createdRoom) return res.status(400).json({ created: false });

    const io = req.app.get("socketio");
    const { roomName, maxPlayers, age, id } = createdRoom;
    io.emit("updatedRooms", { roomName, maxPlayers, age, id, players: 1 });

    res.status(201).json({ created: true, id });
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .send({ errorMessage: "Something went wrong during the request" });
  }
});

module.exports = router;
