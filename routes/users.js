var express = require("express");
var router = express.Router();
const userHandler = require("../models/handleUsers");
const toDoHandler = require("../models/handleToDos");
const modUser = require("../models/handleUsers");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});
//Register
router.get("/register", function(req, res) {
  // display register route
  res.render("register", {
    // display register form view
    title: "Register User" // input data to view
  });
});
router.post("/register", function(req, res) {
  // new user post route
  userHandler.upsertUser(req);
  return res.redirect("/"); // skip the receipt, return to fp
});
//Login
router.get("/login", function(req, res) {
  // display register route
  res.render("login", {
    // display register form view
    title: "User Login", // input data to view
    message: ""
  });
});
router.post("/login", async function(req, res) {
  // new user post route
  let rc = await userHandler.verifyUser(req); // verify credentials
  if (rc) {
    res.redirect("userpanel");
  } else {
    res.render("login", {
      // find the view 'login'
      title: "User Login", // input data to 'login'
      message: "The username or password is incorrect. Try again",
      loggedin: false
    });
  }
});
//Userpanel
router.get("/userpanel", async function(req, res) {
  // display register route
  res.render("userpanel", {
    // find the view 'userpanel'
    title: "Userpanel", // input data to 'userpanel'
    loggedin: true,
    message: "Welcome to your userpanel",
    who: req.session.user // using session var(s)
  });
});
//To Dos
router.get("/toDos", function(req, res) {
  // display register route
  res.render("toDos", {
    // display register form view
    title: "Your Todos" // input data to view
  });
});
router.post("/toDos", async function(req, res) {
  // new user post route
  let rc = await toDoHandler.upsertToDos(req); // verify credentials
  return res.redirect("/users/toDos");
});
router.get("/toDos/:todo", async function(req, res) {
  let todos = await toDoHandler.getToDos({}, { sort: { name: 1 } });
  res.json(todos);
});
//Admin
router.get("/admin", async function(req, res) {
  // display register route
  res.render("admin", {
    // find the view 'userpanel'
    title: "Admin Panel", // input data to 'userpanel'
    loggedin: true,
    message: "Welcome to Admin Panel",
    who: req.session.user // using session var(s)
  });
});

router.get("/admin/:user", async function(req, res) {
  let user = await userHandler.getUsers({}, { sort: { name: 1 } });
  res.json(user);
});
// Admin Delete
router.post("/admin/:user", async function(req, res, next) {
  let delUser = await modUser.deleteUser({ userID: req.body.slet });
  res.render("admin", {
    title: "Admin Panel",
    message: "User Succesfully Deleted",
    who: req.session.slet,
    delUser
  });
});

module.exports = router;
