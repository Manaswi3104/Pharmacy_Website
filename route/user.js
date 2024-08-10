const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const passport = require("passport");

// Login 
router.get("/signup" , (req , res) => {
    res.render("users/signup.ejs");
});

router.post("/signup" , async(req , res) => {
    try{
        let {username, email, password} = req.body;
        const newUser = new User({email , username});
        const registeredUser = await User.register(newUser , password);
        console.log(registeredUser);
        req.login(registeredUser , (err) => {
            if(err){
                return next(err);
            }
            req.flash("success" , "Welcome to Pharamacy4U");
            res.redirect("/categories");
        });
    } catch (e) {
        req.flash("error" , "e,message");
        res.redirect("/signup");
    }
});

// login
router.get("/login" , (req , res) => {
    res.render("users/login.ejs");
});

router.post("/login" , async(req , res) => {
    req.flash("success" , "Welcome back to Phramacy4U");
    req.redirect("/categories");
});

router.get("/logout" , (req , res , next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/categories");
    });
});

module.exports = router;