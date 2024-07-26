projectTempretureData = {};

const express = require("express");
const cors = require("cors");
const bP = require("body-parser");

const appExpress = express();

appExpress.use(bP.urlencoded({ extended: false }));
appExpress.use(bP.json());
appExpress.use(cors());

appExpress.use(express.static("website"));
const serverPort = 8001;
const server = appExpress.listen(serverPort, listening);

function listening() {
  console.log(`Server running ...: ${serverPort}`);
}

appExpress.get("/all", (req, res) => {
  console.log("GET request ");
  res.send(projectTempretureData);
});

appExpress.post("/add", (req, res) => {
  console.log("POST request ", req.body);
  projectTempretureData = {
    temp: req.body.temp,
    date: req.body.date,
    feelings: req.body.feelings,
  };
  res.send(projectTempretureData);
});
