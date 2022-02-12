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



app.use(express.static(path.join(__dirname, "assets")));

app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.get("/dealer", function (req, res) {
  res.render("Dealer.ejs",{status:0});
});
app.get("/driver", function (req, res) {
  res.render("Driver.ejs");
});

app.get("/otp/:email", function (req, res) {
  const email=req.params.email;
  res.render("otp.ejs",{email:email});
});

app.get("/dealerDasboard", function (req, res) {
  res.render("dealerDashboard.ejs");
});
app.post("/dealerSignUp", async (req, res)=> {

  const name=req.body.name;
  const mobile=req.body.mobile;
  const natureOfMaterial=req.body.natureOfMaterial;
  const weightOfMaterial=req.body.weightOfMaterial;
  const quantity=req.body.quantity;
  const city=req.body.city;
  const state=req.body.state;
  const email=req.body.email;
  const password=req.body.password;

   try {
     const list1 = new dealerData({
       name:name,
       mobile:mobile,
       natureOfMaterial:natureOfMaterial,
       weightOfMaterial:weightOfMaterial,
       quantity:quantity,
       city:city,
       state:state,
       email:email,
       password:password
     });
     const result = await dealerData.insertMany([list1]);
     console.log(result);
    //  res.json({ status: 200, result: result });
     res.render("Dealer.ejs",{status:200,result:result});
   } catch (err) {
     res.render("Dealer.ejs", {status:400, result: err });
     console.log(err);
   }

  
});



app.listen(port, () => {
  console.log("done");
});
