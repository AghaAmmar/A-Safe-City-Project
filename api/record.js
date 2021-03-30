const express = require("express");
const router = express.Router();
const Recorder = require("node-rtsp-recorder").Recorder;
var stop = false;
 router.post("/", async (req, res) => {
  console.log(req.body);
  var rec = new Recorder({
    url: req.body.rtsp,
    timeLimit: 60, // time in seconds for each segmented video file
    folder: req.body.path,
    name: "cam1",
  });


 if (req.body.btnText == "Turn On Recording") {
    rec.startRecording();
    res.status(200).json();
  } else {
    rec.stopRecording();
    res.status(200).json();
  }
  res.status(200).json();
});

module.exports = router;
