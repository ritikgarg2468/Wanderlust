const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveReturnTo } = require("../middleware.js");
const controllerUser = require("../controllers/user.js");

router.route("/signup")
    .get(controllerUser.renderSignupForm)
    .post(wrapAsync(controllerUser.createUser)
);

router.route("/login")
    .get(controllerUser.renderLoginForm)
    .post(saveReturnTo, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true}), controllerUser.loginUser
);

router.get("/logout", controllerUser.logoutUser);

module.exports = router;