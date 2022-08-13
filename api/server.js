const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const studentRouter = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log(`Database Connection Established.`));

app.use('/students', studentRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});