const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const hbs = require("hbs");
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const rajAirTracking = async (awbNo) => {
  const extractedAWBNo = awbNo.substring(3);
  const apiUrl = `https://softctl.com/Alltracking/Rajairr?AwbNo=${extractedAWBNo}`;
  try {
    const response = await axios.get(apiUrl);
    const $ = cheerio.load(response.data);
    const trackingData = $("#resultContainer").html();
    return trackingData;
  } catch (error) {
    console.error("Error calling API:", error.message);
  }
};

app.get("/", async (req, res) => {
  res.status(200).render("home");
});
app.post("/individualAWBId", async (req, res) => {
  const AWB_ID = req.body.AWB_ID;

  const apiData = await rajAirTracking(AWB_ID);
  return res.status(200).json({
    status: true,
    message: "Process Completed Successfully!",
    data: apiData,
  });
});
app.listen("1234");
module.exports = app;
