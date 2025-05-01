const express = require("express");
const routes = require("./routes/Api.route");
const dotenv = require("dotenv");
const migrate = require("./models/migrate");
dotenv.config();

const app = express();

app.use(routes);

app.listen(3000);
