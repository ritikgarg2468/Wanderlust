if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const user = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));





const store = MongoStore.create({
    mongoUrl: process.env.ATLAS_DB, // MongoDB connection string
    crypto: {
        secret: 'keyboard cat', // secret key for signing the session ID cookie
    },
    touchAfter: 24 * 3600, // time period in seconds after which to update the session 

});

store.on("error", function (e) {
    console.log("session store error", e); // log any errors with the session store
});

const sessionOptions = { 
    store,
    secret: 'keyboard cat',// secret key for signing the session ID cookie
    resave: false, // don't save session if unmodified
    saveUninitialized: true, // save uninitialized sessions to the store
    cookie: {
        expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: true,
        // secure: false, // Set to true if using HTTPS
    }, 
};

app.use(session(sessionOptions)); // Use express-session middleware
app.use(flash()); // Use connect-flash middleware

app.use(passport.initialize()); // Initialize passport
app.use(passport.session()); // Use passport session middleware
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy for authentication
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user; // Make currentUser available in all views
    next();
});

//-------------------------------------------DB connection---------------------------------------------------
const MONGO_URL = process.env.ATLAS_DB;

async function dbConnect() {
    await mongoose.connect(MONGO_URL);
};

dbConnect().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

//----------------------------------------------------------------------------------------------------------

// root route
app.get("/", (req, res) => {
    res.redirect("/listings");
});
// listing route
app.use("/listings", listings);
// review route
app.use("/listings/:id/reviews", reviews);
// user route
app.use("/", user);

//----------------------------------------Listing route--------------------------------------------------
// transfer into routes/listing.js


//----------------------------------------Review route--------------------------------------------------
// transfer into routes/review.js

// ----------------------------------------------------------Test route (Image should take degault value(ref: listing.js(Models))).-----------
// app.get("/testlisting", async (req, res) => {
    //     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "by the veach",
//         price: 1200,
//         location: "new york",
//         country: "USA",
//     });
//     await sampleListing.save();
//     res.send("testing sucess");

// });
//---------------------------------------------------------------------------------------------------------------------------------
//middleware to handle notavilable routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"));
});


// Error handling middleware(handles all errors come form above code)
app.use((err, req, res, next) => {
    let {statusCode = 500, message = "something wend wrong"} = err;
    res.status(statusCode).render("listings/error.ejs", { err, message });
    // res.status(statusCode).send(message);
});
//-----------------------------------------------Server listening--------------------------------------------------
app.listen("3000", () => {
    console.log("app listening on port 3000");
});