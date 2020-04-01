var express = require("express");
var router = express.Router();
const userHandler = require("../models/handleUsers");
const toDoHandler = require("../models/handleToDos");

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
    res.render("toDos", {
      // find the view 'index'
      title: "Your Todos", // input data to 'index'
      loggedin: true,
      message: "Logged in as",
      who: req.session.user, // using session var(s)
    });
  } else {
    res.render("login", {
      // find the view 'login'
      title: "User Login", // input data to 'login'
      message: "The username or password is incorrect. Try again",
      loggedin: false
    });
  }
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
  if (rc) {
    res.render("toDos", {
      // find the view 'index'
      title: "Your Todos", // input data to 'index'
      loggedin: true,
      message: "Logged in as",
      who: req.session.user, // using session var(s)
    });
  } else {
    res.render("login", {
      // find the view 'login'
      title: "User Login", // input data to 'login'
      loggedin: false
    });
  }
});
//Admin
router.get("/admin", async function(req, res) {
  let rc = await userHandler.getUsers(req); // verify credentials
  if (rc) {
    res.render("admin", {
      // find the view 'index'
      title: "Admin Panel", // input data to 'index'
      loggedin: true,
      message: "Logged in as Admin",
      who: req.session.user // using session var(s)
    });
  } else {
    res.render("login", {
      // find the view 'login'
      title: "User Login", // input data to 'login'
      message: "The username or password is incorrect. Try again",
      loggedin: false
    });
  }
});
router.get("/admin/:user", async function(req, res) {
  let user = await userHandler.getUsers({}, { sort: { name: 1 } });
  res.json(user);
});

module.exports = router;
