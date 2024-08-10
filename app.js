const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Category = require("./models/category.js")
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Joi = require('joi');

const userRouter = require("./route/user.js");

const mongo_url = "mongodb://127.0.0.1:27017/Pharamacy4U";

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs" , ejsMate);
app.use(express.static(path.join(__dirname , "/public")));

const sessionOptions = {
    secret: "mysupersecreatstring" ,
    resave:false , 
    saveUninitialized: true,
    Cookie : {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly: true ,
    },
  };


app.get("/" , (req , res) => {
    res.send("Hi , i am a root");
    
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req , res , next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

main()
.then(() => {
    console.log("Connected to DB");
})
.catch((err) => {
    console.log(err);
})

async function main(){
    await mongoose.connect(mongo_url);
}

app.use("/" , userRouter);

// Index route
app.get("/categories" , async(req , res) => {
    const allCategories = await Category.find({});
    res.render("./categories/index.ejs" , {allCategories});
});


app.listen(8080 , () => {
    console.log("Server is listening to port 8080")
}) ;
