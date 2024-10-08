const express = require("express");
const app = express();
const cheerio = require("cheerio");

const rajAirTracking = async (awbNo) => {
  const extractedAWBNo = awbNo.substring(3);
  const apiUrl = `https://softctl.com/Alltracking/Rajairr?AwbNo=${extractedAWBNo}`;
  try {
    const response = await axios.get(apiUrl);
    const $ = cheerio.load(response.data);
    // resultContainer;
    // shipmenthistory;
    const trackingData = $("#resultContainer").html();
    return trackingData;
  } catch (error) {
    console.error("Error calling API:", error.message);
  }
};

const hbs = require("hbs");
app.set("view engine", "hbs");

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
module.exports = app;
