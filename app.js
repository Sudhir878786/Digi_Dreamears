const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const path = require("path");
const { traceDeprecation } = require("process");
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
userData = [];
ind = null;
// app.use('/assets',express.static('/assets'));
app.use(express.static(path.join(__dirname, "assets")));
// app.get("/", function (req, res) {
//   res.render("index", { data: userData, ind: ind });
// });
// app.post("/add", function (req, res) {
//   console.log(req.body);
//   const taskTitle = req.body.taskTitle;
//   const taskDescription = req.body.taskDescription;
//   if (taskDescription != "" && taskTitle != "") {
//     find = false;
//     userData.forEach((ele) => {
//       if (ele.taskTitle == taskTitle) {
//         find = true;
//       }
//     });
//     if (!find) {
//       temp = {
//         taskTitle: taskTitle,
//         taskDescription: taskDescription,
//         isChecked: false,
//       };
//       userData.push(temp);
//     }
//   }
//   res.render("index", { data: userData, ind: ind });
// });
// app.post("/update", function (req, res) {
//   console.log(req.body);
//   const taskTitle = req.body.taskTitle;
//   const taskDescription = req.body.taskDescription;
//   if (taskDescription != "" && taskTitle != "") {
//     temp = {
//       taskTitle: taskTitle,
//       taskDescription: taskDescription,
//       isChecked: false,
//     };
//     userData[ind] = temp;
//     ind = null;
//   }
//   res.render("index", { data: userData, ind: ind });
// });
// app.get("/check/:index/:isDone", function (req, res) {
//   const index = req.params.index;
//   const isDone = req.params.isDone;
//   console.log(isDone);
//   if (isDone == "true") {
//     userData[index].isChecked = true;
//   } else {
//     userData[index].isChecked = false;
//   }
//   console.log(userData[index].isChecked);
//   res.render("index", { data: userData, ind: ind });
// });
// app.get("/del/:title", function (req, res) {
//   const title = req.params.title;
//   userData.forEach((ele) => {
//     if (ele.taskTitle == title) {
//       userData.splice(userData.indexOf(ele), 1);
//     }
//   });
//   res.render("index", { data: userData, ind: ind });
// });
// app.get("/edit/:index", function (req, res) {
//   const index = req.params.index;
//   ind = index;
//   res.render("index", { data: userData, ind: ind });
// });
// app.get("/popClose", function (req, res) {
//   ind = null;
//   res.render("index", { data: userData, ind: ind });
// });
app.get("/", function (req, res) {
  res.render("index.ejs");
});
app.get("/dealer", function (req, res) {
  res.render("Dealer.ejs");
});
app.get("/driver", function (req, res) {
  res.render("Driver.ejs");
});

app.listen(port, () => {
  console.log("done");
});
