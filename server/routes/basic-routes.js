const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({
    something: "value",
  });
});

module.exports = router;
