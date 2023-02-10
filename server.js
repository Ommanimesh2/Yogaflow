const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000;
const Sib = require("sib-api-v3-sdk");
const bodyParser = require("body-parser");
require("dotenv").config();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "./build")));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});                                 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/sendmail", (req, res) => {
  const { name, number, email, message } = req.body;
  const tranEmailApi = new Sib.TransactionalEmailsApi();
  const sender = {
    email: email,
    name: name,
  };
  const receivers = [
    {
      email: "ommanimeshmishra@gmail.com",
    },
  ];
  tranEmailApi
    .sendTransacEmail({
      sender,
      to: receivers,
      subject: "aajao idhar",
      htmlContent: `
        <h4>${message}</h4>
        `,
      params: {
        role: "Frontend",
      },
    })
    .then(console.log)
    .catch(console.log);
});
app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "./build/index.html")
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
