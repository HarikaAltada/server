const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const MERCHANT_KEY = process.env.MERCHANT_KEY;
const SALT = process.env.SALT;

// Generate hash for PayU
app.post("/generate-hash", (req, res) => {
  const { txnid, amount, productinfo, firstname, email } = req.body;
  const hashString = `${MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${SALT}`;
  const hash = crypto.createHash("sha512").update(hashString).digest("hex");
  res.json({ hash });
});

// ✅ Must be ABOVE app.listen
app.post("/success", (req, res) => {
//   console.log("✅ SUCCESS route hit with body:", req.body);
  res.redirect("http://localhost:3000/success");
});

app.post("/failure", (req, res) => {
//   console.log("❌ FAILURE route hit with body:", req.body);
  res.redirect("http://localhost:3000/failure");
});

app.get("/", (req, res) => {
  res.send("PayU Backend is up and running 🚀");
});

app.listen(5000, () => {
  console.log("🔑 PayU Hash Generator Server is running on http://localhost:5000");
});
