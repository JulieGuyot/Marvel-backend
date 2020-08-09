const express = require("express");
const router = express.Router();
const md5 = require("md5");
const axios = require("axios");

router.get("/characters/:id/comics", async (req, res) => {
  try {
    const date = new Date();
    let offset = req.query.offset;
    const timestamp = date.getTime() / 1000;
    const ts = Math.floor(timestamp);
    const hash = md5(
      ts +
        process.env.MARVEL_PRIVATE_API_KEY +
        process.env.MARVEL_PUBLIC_API_KEY
    );

    const apikey = process.env.MARVEL_PUBLIC_API_KEY;

    const response = await axios.get(
      `https://gateway.marvel.com/v1/public/characters/${req.params.id}/comics?offset=${offset}&ts=${ts}&apikey=${apikey}&hash=${hash}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
