const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const path = require("path");
const { traceDeprecation } = require("process");
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://flipr:flipr@cluster0.q44mk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )

  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
const dealerSchema = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: [String] },
});

const dealerData = new mongoose.model("stateTable", dealerSchema);










app.use(express.static(path.join(__dirname, "assets")));

app.get("/", function (req, res) {
  res.render("home.ejs");
});
app.get("/dealerDasboard", function (req, res) {
  res.render("dealerDashboard.ejs");
});

app.listen(port, () => {
  console.log("done");
});
