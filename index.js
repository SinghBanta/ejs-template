const express = require("express");
const routes = require("./routes/Api.route");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.use(routes);

app.listen(3000);
