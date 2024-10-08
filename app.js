const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 1234;
const routes = require("./routes/mainRoutes");
require("./config/db.config");
require("./helpers/hbs.helper");

app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes);

const hbs = require("hbs");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "templates", "pages"));
hbs.registerPartials(path.join(__dirname, "templates", "partials"));

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Vercel" });
});

module.exports = app;
