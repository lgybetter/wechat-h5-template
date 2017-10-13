const express = require("express");
const crypto = require("crypto");
const config = require("./config");

const app = express();

app.get("/", function(req, res) {
  let signature = req.query.signature,
    timestamp = req.query.timestamp,
    nonce = req.query.nonce,
    echostr = req.query.echostr;
  let array = [config.token, timestamp, nonce];
  array.sort();
  let tempStr = array.join("");
  const hashCode = crypto.createHash("sha1");
  let resultCode = hashCode.update(tempStr, "utf8").digest("hex");

  if (resultCode === signature) {
    res.send(echostr);
  } else {
    res.send("mismatch");
  }
});

app.listen(3000);
