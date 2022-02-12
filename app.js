const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
const path = require("path");
// const port = process.env.PORT || 8000;
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
// const path = require("path");
const { traceDeprecation } = require("process");
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
var driver_name;
var driver_age;
var driver_number;
var driver_trucknumber;
var driver_truckcapacity;
var driver_transportername;
var driver_email;
var driver_password;
var driver_experience;
var otp;

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

const listSchema = new mongoose.Schema({
  state: { type: String, required: true },
  city: { type: [String] },
});

const stateTable = new mongoose.model("stateTable", listSchema);
var states;
const getList = async () => {
  try {
    const result = await stateTable
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find();
    // console.log(result);
    states = result;
  } catch (err) {
    console.log(err);
  }
};
var dealers;
getList();

const dealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: Number, required: true },
  natureOfMaterial: { type: String, required: true },
  weightOfMaterial: { type: String, required: true },
  quantity: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const dealerData = new mongoose.model("dealers", dealerSchema);

const detailschema = {
  driver_name: String,
  driver_age: String,
  driver_number: Number,
  driver_trucknumber: String,
  driver_truckcapacity: String,
  driver_transportername: String,
  driver_email: String,
  driver_password: String,
  driver_experience: String,
  // companypassword:String,
};
const Driver = mongoose.model("Driver", detailschema);
var drivers;
const getListDrivers = async () => {
  try {
    const result = await Driver
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find();
    //  console.log(result);

    drivers = result;
  } catch (err) {
    console.log("err")
    console.log(err);
  }
};

getListDrivers();
// console.log(drivers)

var transporter = nodemailer.createTransport({
  service: "",
  auth: {
    user: "kapilmehta634@gmail.com",
    pass: "Kapil@12345",
  },
});

const getListDealers = async () => {
  try {
    const result = await dealerData
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find();
    // console.log(result);
    dealers = result;
  } catch (err) {
    console.log(err);
  }
};

getListDealers();

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.post("/otp", function (req, res) {
  // const email=req.params.email;
  var rotp1 = req.body.otp1;
  var rotp2 = req.body.otp2;
  var rotp3 = req.body.otp3;
  var rotp4 = req.body.otp4;
  var final = rotp1 + rotp2 + rotp3 + rotp4;
  if (final == otp) {
    console.log("correct");
  }
});
app.get("/dealer", function (req, res) {
  res.render("Dealer.ejs", { status: 0, states: states });
});
app.get("/driver", function (req, res) {
  res.render("Driver.ejs", { states: states });
});

app.get("/otp/:email", function (req, res) {
  const email = req.params.email;
  res.render("otp.ejs", { email: email });
});

app.get("/dealerDasboard/:email", function (req, res) {
  const email=req.params.email;
  res.render("dealerDashboard.ejs",{email:email,drivers:drivers});
});
app.get("/driverDashboard", function (req, res) {
  res.render("Drivers_Dashboard.ejs", { dealers: dealers });
});
app.post("/dealerSignUp", async (req, res) => {
  const name = req.body.name;
  const mobile = req.body.mobile;
  const natureOfMaterial = req.body.natureOfMaterial;
  const weightOfMaterial = req.body.weightOfMaterial;
  const quantity = req.body.quantity;
  const city = req.body.city;
  const state = req.body.state;
  const email = req.body.email;
  const password = req.body.password;

  const ct = await dealerData.find({ email: email }).countDocuments();
  console.log(ct);
  if (ct == 0) {
    try {
      const list1 = new dealerData({
        name: name,
        mobile: mobile,
        natureOfMaterial: natureOfMaterial,
        weightOfMaterial: weightOfMaterial,
        quantity: quantity,
        city: city,
        state: state,
        email: email,
        password: password,
      });
      const result = await dealerData.insertMany([list1]);
      console.log(result);
      //  res.json({ status: 200, result: result });
      res.render("Dealer.ejs", { status: 200, email: email, states: states });
    } catch (err) {
      res.render("Dealer.ejs", { status: 400, states: states });
      console.log(err);
    }
  } else {
    res.render("Dealer.ejs", { status: 300, email: email, states: states });
  }
});

app.listen(port, () => {
  console.log("done");
});
