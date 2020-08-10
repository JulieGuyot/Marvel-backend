require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

const charactersIdRoutes = require("./routes/charactersId");
app.use(charactersIdRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
