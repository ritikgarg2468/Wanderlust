const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.createUser = async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        await User.register(newUser, password);
        // Automatically log in the user after registration
        req.login(newUser, (err) => {
            if (err) {
                req.flash("error", err.message);
                return res.redirect("/signup");
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.loginUser = (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect(res.locals.returnTo || "/listings"); // Redirect to the original URL or default to "/listings"
};

module.exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};