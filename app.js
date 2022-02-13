const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");

const mongoose = require("mongoose");
const port = process.env.PORT || 8000;
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const path = require("path");
// const port = process.env.PORT || 8000;
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
// const path = require("path");
const { traceDeprecation } = require("process");
const { json } = require("express");
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cors());
app.use(express.json());
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: true }));

const router=express.Router();

var sessionId;
var btn;

var driver_name;

var driver_age;
var driver_number;
var driver_trucknumber;
var driver_truckcapacity;
var driver_transportername;
var driver_email;
var driver_password;
var driver_experience;
var dealer_email;
var otp;
var email4;

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
const detailschema = {
  driver_name: String,
  driver_age: String,
  driver_number: Number,
  driver_trucknumber: String,
  driver_truckcapacity: String,
  driver_transportername: String,
  driver_email: String,
  dealer_email: String,
  driver_password: String,
  driver_experience: String,
  state1: String,
  state2: String,
  state3: String,
  city1: String,
  city2: String,
  city3: String,
  // companypassword:String,
};
const Driver = mongoose.model("Driver", detailschema);
const Driver2 = mongoose.model("Driver2", detailschema);
var drivers=[];
var fdealers=[];
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
// const Item2 = mongoose.model("Item2" , itemschema);
// const Item3 = mongoose.model("Item3" , itemschema);
// const Item4 = mongoose.model("Item4" , itemschema);

// const dealerData =new  mongoose.model("stateTable", dealerSchema);

var transporter = nodemailer.createTransport({
  service: "",
  auth: {
    user: "kapilmehta634@gmail.com",
    pass: "Kapil@12345",
  },
});

const stateTable = new mongoose.model("stateTable", listSchema);
var states=[];
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
var dealers=[];
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

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.post("/otp", function (req, res) {
  // const email=req.params.email;
  var rotp1 = req.body.otp1;
  var rotp2 = req.body.otp2;
  var rotp3 = req.body.otp3;
  var rotp4 = req.body.otp4;
  var final = rotp1+rotp2+rotp3+rotp4;
  if(final==otp){
    sessionId = req.session;
    sessionId.email=sessionId.tempDriverEmail;
    sessionId.isDriver=true;
    sessionId.isDealer=false;
    res.redirect("/driverDashboard/"+sessionId.tempDriverEmail)
  }
  
});
router.get("/dealer", function (req, res) {
  sessionId = req.session;
  if (sessionId.email && sessionId.isDealer==true) {
    return res.redirect("/dealerDasboard/"+sessionId.email);
  }
  res.render("Dealer.ejs", { status: 0, states: states });
});
router.get("/driver", function (req, res) {
  sessionId = req.session;
  if (sessionId.email && sessionId.isDriver == true) {
    return res.redirect("/driverDashboard/"+sessionId.email);
  }
  res.render("Driver.ejs",{states: states });
});
router.get("/dealer2", function (req, res) {});
router.post("/dealer2", function (req, res) {
  res.redirect("/otp3");
});

router.get("/otp", function (req, res) {
  // const email=req.params.email;
  res.render("otp.ejs");
});
router.get("/otp3", function (req, res) {
  res.render("otp3.ejs");
});

router.post("/otp4", function (req, res) {
  // const email=req.params.email;
  // var email = req.body.email;
  var rotp1 = req.body.otp1;
  var rotp2 = req.body.otp2;
  var rotp3 = req.body.otp3;
  var rotp4 = req.body.otp4;
  var final = rotp1 + rotp2 + rotp3 + rotp4;
  if (final == otp) {
    // res.redirect(/dealerDashboard/email4);
    sessionId = req.session;
    sessionId.email=sessionId.tempDriverEmail;
    sessionId.isDriver=true;
    sessionId.isDealer=false;
    res.redirect("/driverDashboard/"+sessionId.email);
  }
  else{
    res.redirect("/driver")
  }
});
router.post("/otp3", function (req, res) {
  // const email=req.params.email;
  // var email = req.body.email;
  var rotp1 = req.body.otp1;
  var rotp2 = req.body.otp2;
  var rotp3 = req.body.otp3;
  var rotp4 = req.body.otp4;
  var final = rotp1 + rotp2 + rotp3 + rotp4;
  if (final == otp) {
    console.log(email4+"lait")
    sessionId = req.session;
    sessionId.email=sessionId.tempDealerEmail;
    sessionId.isDealer=true;
    sessionId.isDriver=false;
    //  res.redirect("dealerDasboard/"+email4);
     res.redirect("/dealerDasboard/"+sessionId.email);
  }
  else{
    res.redirect("/dealer")
  }
});
var are;
var dealerState;
var dealerCity;
router.get("/dealerDasboard/:email", async (req, res) =>{

   sessionId = req.session;
   if (!sessionId.email) {
     return res.redirect("/");
   }
  const email = req.params.email;
  try {
    const result = await dealerData
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find({ email: email });
    // console.log(result);
    
      dealerState = result[0].state;
      dealerCity = result[0].city;
  } catch (err) {
    console.log(err);
  }
   try {
     const result = await Driver
       // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
       // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
       .find();
      // console.log(result);

     drivers = result;
   } catch (err) {
     console.log("err");
     console.log(err);
   }
   var tempDrivers=[];
  //  console.log(drivers);
  var ct=0;
   console.log(drivers.lenght);
   for (var key in drivers) {
     if (drivers.hasOwnProperty(key)) {
       ct++;
      console.log(drivers[key])
     }
   }
  console.log(dealerState);
  console.log(dealerCity);
   for(var i=0;i<ct;i++){
     console.log(i);
     console.log(drivers[i].state1);
      if((drivers[i].state1==dealerState && drivers[i].city1==dealerCity)||(drivers[i].state2==dealerState && drivers[i].city2==dealerCity)||(drivers[i].state3==dealerState && drivers[i].city3==dealerCity)){
        tempDrivers.push(drivers[i]);
      }
   }
   console.log(tempDrivers);
  res.render("dealerDashboard.ejs", { email: email, drivers: drivers,states:states,td:tempDrivers});
});
var dealerCity;
router.post("/filterDealer/:email", async (req, res) =>{
  sessionId = req.session;
  if (!sessionId.email) {
    return res.redirect("/");
  }
  const s1=req.body.state1;
  const s2=req.body.state2;
  const c1=req.body.city1;
  const c2=req.body.city2;
  const email = req.params.email;
  try {
    const result = await dealerData
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find({ email: email });
    // console.log(result);
    
      dealerState = result[0].state;
      dealerCity = result[0].city;
  } catch (err) {
    console.log(err);
  }
   try {
     const result = await Driver
       // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
       // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
       .find();
      // console.log(result);

     drivers = result;
   } catch (err) {
     console.log("err");
     console.log(err);
   }
   var tempDrivers=[];
  //  console.log(drivers);
  var ct=0;
  //  console.log(drivers.lenght);
   for (var key in drivers) {
     if (drivers.hasOwnProperty(key)) {
       ct++;
      console.log(drivers[key])
     }
   }
  console.log(dealerState);
  console.log(dealerCity);
   for(var i=0;i<ct;i++){
     console.log(i);
     console.log(drivers[i].state1);
      if (
        (drivers[i].state1.toLowerCase() == s1.toLowerCase() &&
          drivers[i].city1.toLowerCase() == c1.toLowerCase() &&
          drivers[i].state2.toLowerCase() == s2.toLowerCase() &&
          drivers[i].city2.toLowerCase() == c2.toLowerCase()) ||
        (drivers[i].state2.toLowerCase() == s1.toLowerCase() &&
          drivers[i].city2.toLowerCase() == c1.toLowerCase() &&
          drivers[i].state1.toLowerCase() == s2.toLowerCase() &&
          drivers[i].city1.toLowerCase() == c2.toLowerCase()) ||
        (drivers[i].state1.toLowerCase() == s1.toLowerCase() &&
          drivers[i].city1.toLowerCase() == c1.toLowerCase() &&
          drivers[i].state3.toLowerCase() == s2.toLowerCase() &&
          drivers[i].city3.toLowerCase() == c2.toLowerCase()) ||
        (drivers[i].state3.toLowerCase() == s1.toLowerCase() &&
          drivers[i].city3.toLowerCase() == c1.toLowerCase() &&
          drivers[i].state1.toLowerCase() == s2.toLowerCase() &&
          drivers[i].city1.toLowerCase() == c2.toLowerCase()) ||
        (drivers[i].state2.toLowerCase() == s1.toLowerCase() &&
          drivers[i].city2.toLowerCase() == c1.toLowerCase() &&
          drivers[i].state3.toLowerCase() == s2.toLowerCase() &&
          drivers[i].city3.toLowerCase() == c2.toLowerCase()) ||
        (drivers[i].state3.toLowerCase() == s1.toLowerCase() &&
          drivers[i].city3.toLowerCase() == c1.toLowerCase() &&
          drivers[i].state2.toLowerCase() == s2.toLowerCase() &&
          drivers[i].city2.toLowerCase() == c2.toLowerCase())
      ) {
        tempDrivers.push(drivers[i]);
      }
   }
  //  console.log(tempDrivers);
  res.render("dealerDashboard.ejs", { email: email, drivers: drivers,states:states,td:tempDrivers});
});
router.get("/driverDashboard/:email", async (req, res) =>{
  const email=req.params.email;
  console.log(email);
  sessionId = req.session;
  if (!sessionId.email) {
    return res.redirect("/");
  }
  
  try {
    const result = await Driver2
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find({driver_email:email});
    // console.log(result);
    fdealers = result;
  } catch (err) {
    console.log(err);
  }
  console.log(fdealers);
  dealers=[];
 for (var key in fdealers) {
   if (fdealers.hasOwnProperty(key)) {
     var dealer_e=(fdealers[key].dealer_email);
    var dealer2;
     console.log("ff" + dealer_e);
     try {
       const result = await dealerData
         // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
         // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
         .find({ email: dealer_e });
       // console.log(result);
       dealer2 = result;
     } catch (err) {
       console.log(err);
     }
     if(dealer2[0]){
     dealers.push(dealer2[0]);
     }
   }
 }
  
  console.log(dealers);
  res.render("Drivers_Dashboard.ejs", { dealers: dealers });
});

router.post("/dealerSignUp", async (req, res) => {
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
        state: states[state]["state"],
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
router.post("/driver_login3", function (req, res) {
  var email = req.body.email;
  otp = Math.floor(1000 + Math.random() * 9000);
  var otp2 = otp.toString();
  sessionId = req.session;
  sessionId.tempDriverEmail=email;
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "kapilmehta634@gmail.com",
        pass: "Kapil@12345",
      },
    })
  );
  var mailOptions = {
    from: "kapilmehta634@gmail.com",
    to: email,
    subject: "OTP",
    text: "OTP = " + otp2,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.redirect("/otp3");
});
router.post("/dealer_login3", function (req, res) {
   email4 = req.body.email;
  otp = Math.floor(1000 + Math.random() * 9000);
  var otp2 = otp.toString();
  sessionId = req.session;
  sessionId.tempDealerEmail=email4;
  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "kapilmehta634@gmail.com",
        pass: "Kapil@12345",
      },
    })
  );
  var mailOptions = {
    from: "kapilmehta634@gmail.com",
    to: email4,
    subject: "OTP",
    text: "OTP = " + otp2,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.redirect("/otp");
});

router.post("/driver_login2", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  try {
    const result = await Driver
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find();
    //  console.log(result);

    drivers = result;
  } catch (err) {
    console.log("err");
    console.log(err);
  }
  // console.log(drivers);
  var f=0;
  for (var key in drivers) {
    if (drivers.hasOwnProperty(key)) {
      
      // console.log(drivers[key].driver_name);

      if(drivers[key].driver_name==username && drivers[key].driver_password==password){
        console.log(drivers[key].driver_name);
        console.log(drivers[key].driver_password);
        sessionId=req.session;
        sessionId["email"] = drivers[key].driver_email;
        sessionId["isDriver"]=true;
        f=1;
        break;
      }

    }
  }
    if(f==1){
      res.redirect("/driverDashboard/"+sessionId.email);
    }
    else{
      res.redirect("/driver");
    }
  

  
});

router.post("/dealer_login2", async (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  try {
    const result = await dealerData
      // .find({name:{$in:["anshu","ankit"]},number:{$gt:21}})
      // .find({$or:[{name:"anshu"},{number:{$gt:21}}]})
      .find({name:username,password:password});
    //  console.log(result);

    dealers = result;
  } catch (err) {
    console.log("err");
    console.log(err);
  }
  console.log(dealers[0]);
  
    if(dealers[0]){
      sessionId=req.session;
      sessionId["email"]=dealers[0]["email"];
      sessionId.isDealer=true;
      sessionId.isDriver=false;
      res.redirect("/dealerDasboard/"+sessionId.email);
    }
    else{
      res.redirect("/dealer");
    }


  
});

router.get("/logOut", function (req, res) {
sessionId = req.session;
sessionId.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });


});

router.post("/driver", function (req, res) {
  driver_name = req.body.driver_name;
  driver_age = req.body.driver_age;
  driver_number = req.body.driver_number;
  driver_trucknumber = req.body.driver_trucknumber;
  driver_truckcapacity = req.body.driver_truckcapacity;
  driver_transportername = req.body.driver_transportername;
  driver_email = req.body.driver_email;
  driver_password = req.body.driver_password;
  driver_experience = req.body.driver_experience;
  var state1 = req.body.state1;
  var city1 = req.body.city1;
  var state2 = req.body.state2;
  var city2 = req.body.city2;
  var state3 = req.body.state3;
  var city3 = req.body.city3;

  // console.log("hello");

  const driver = new Driver({
    driver_name: driver_name,
    driver_age: driver_age,
    driver_number: driver_number,
    driver_trucknumber: driver_trucknumber,
    driver_truckcapacity: driver_truckcapacity,
    driver_transportername: driver_transportername,
    driver_email: driver_email,
    driver_password: driver_password,
    driver_experience: driver_experience,
    state1: states[state1]["state"],
    city1: city1,
    state2: states[state2]["state"],
    city2: city2,
    state3: states[state3]["state"],
    city3: city3,
  });
  driver.save();
  res.render("Driver.ejs",{states:states});
});
router.get("/otp", function (req, res) {
  const email = req.params.email;
  res.render("otp.ejs", { email: email });
});
router.post("/btn", function (req, res) {
  btn = req.body.btn;

  sessionId = req.session;
  var dealerEmail = sessionId.email;

  const driver1 = new Driver2({
    driver_email: btn,
    dealer_email: dealerEmail,
  });
  driver1.save();
  change = "b";
  res.redirect("/dealerDasboard/"+dealerEmail);

  // console.log(btn+"this is btn");
});
router.get("*", function (req, res) {
  res.render("404");
});
app.use("/", router);

app.listen(port, () => {
  console.log("done");
});
