const express = require("express");
const routes = require("./routes/Api.route");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Set EJS as templating engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(routes);

app.listen(3000);
