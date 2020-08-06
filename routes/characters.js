const express = require("express");
const router = express.Router();
const md5 = require("md5");
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    let limit = 100;
    // let page = req.query.page;
    // let offset = 100;
    const date = new Date();

    const timestamp = date.getTime() / 1000;
    const ts = Math.floor(timestamp);
    const hash = md5(
      ts +
        process.env.MARVEL_PRIVATE_API_KEY +
        process.env.MARVEL_PUBLIC_API_KEY
    );

    const apikey = process.env.MARVEL_PUBLIC_API_KEY;

    if (req.query.nameStartsWith) {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&orderBy=name&nameStartsWith=${req.query.nameStartsWith}`
      );
      res.json(response.data);
    } else {
      const response = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${apikey}&hash=${hash}&limit=${limit}&orderBy=name`
      );
      res.json(response.data);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
