const express = require('express');

const router = express.Router()
const bcrypt = require("bcryptjs");
const User = require('../Models/user');

router.get('/login', async (req, res) => {
    let flash = req.session.flash 
    req.session.flash = null
    res.render('login', { layout: 'layouts/layout2' ,errorMessage: flash })
  })


  router.get('/signup', async (req, res) => {
    let flash = req.session.flash 
    req.session.flash = null
    res.render('signup', { layout: 'layouts/layout2', errorMessage: flash })
  })
  
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    req.session.flash = "No Such User exist, Sign Up"
    if (!user) return res.redirect("/auth/login");
  
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      req.session.user = user;
      req.session.flash =  "Logged in Successfully"
      return res.redirect("/" );
    } else {
      req.session.flash = "Invalid Password"
  
      return res.redirect("/auth/login");
    }
    // res.status(400).send({ isValid });
  });
  
  router.post("/signup", async (req, res) => {
     // Check if a user with the same email already exists
     const existingUser = await User.findOne({ email: req.body.email });

     if (existingUser) {
       // If a user with the same email exists, render the signup page with an error message
       console.log("User already exists")
       const errorMessage = "Email already in use.";
       return res.render('signup', { layout: 'layouts/layout2', errorMessage });
     }
    let user = new User(req.body);
    console.log(req.body)
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    req.session.user = user;
    req.session.flash =  "Logged in Successfully"
    return res.redirect("/" );

  });

module.exports = router