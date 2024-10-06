const axios = require("axios");
const cheerio = require("cheerio");

// const rajAirTracking = async (awbNo) => {
//   const apiUrl = `https://softctl.com/Alltracking/Rajairr?AwbNo=${awbNo}`;
//   try {
//     const response = await axios.get(apiUrl);
//     console.log("Response data:", response.data);
//   } catch (error) {
//     console.error("Error calling API:", error.message);
//   }
// };

const rajAirTracking = async (awbNo) => {
  const extractedAWBNo = awbNo.substring(3);
  const apiUrl = `https://softctl.com/Alltracking/Rajairr?AwbNo=${extractedAWBNo}`;
  try {
    const response = await axios.get(apiUrl);
    const $ = cheerio.load(response.data);
    // resultContainer;
    // shipmenthistory;
    const trackingData = $("#resultContainer").html();
    return trackingData; // Return the extracted data
  } catch (error) {
    console.error("Error calling API:", error.message);
  }
};

module.exports = {
  getHome: (req, res) => {
    res.status(200).render("home");
  },
  postIndividualAWBId: async (req, res) => {
    const AWB_ID = req.body.AWB_ID;

    const apiData = await rajAirTracking(AWB_ID);
    return res.status(200).json({
      status: true,
      message: "Process Completed Successfully!",
      data: apiData,
    });
  },
};
