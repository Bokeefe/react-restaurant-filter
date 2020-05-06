const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "build")));
console.log(path.join(__dirname, "build", "index.html"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 8080, function () {
  console.log("app listening on port 8080!");
});
