const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
// app.options("*", cors());

app.get("/", (req, res) => {
  //   res.setHeader("Access-Control-Allow-Credentials", true);
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send("running perfectly");
});

app.get("/proxy", async (req, res) => {
  try {
    // res.setHeader("Access-Control-Allow-Credentials", true);
    // res.setHeader("Access-Control-Allow-Origin", "*");
    const response = await axios({
      method: req.method,
      url: req.query.url,
      data: req.body,
    });
    res.set(response.headers);
    res.status(response.status).send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

app.listen(4040, () => {
  console.log("CORS proxy listening on port 4040");
});
