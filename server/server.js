const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const artistRoutes = require("./routes/artistRoutes");
const songRoutes = require("./routes/songRoutes");
const albumRoutes = require("./routes/albumRoutes");

const app = express();

app.use(cors());
app.use(bodyparser.json());

app.use("/api/artists", artistRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);

app.listen(5000);
