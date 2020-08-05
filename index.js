require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.listen(3000, () => {
  console.log("Server started");
});
