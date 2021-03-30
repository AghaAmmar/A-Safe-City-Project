const express = require("express");
const app = express();
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
const camera = require("./api/camera");
const record = require("./api/record");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//Api Routes
app.use("/api/camera", camera);
app.use("/api/record", record);
//app.use("/api/record/mode", record);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server start running on port ${port}`);
});
