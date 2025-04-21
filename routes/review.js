const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const controllerReviews = require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    };
};
//create review route
router.post("/", isLoggedIn, validateReview, wrapAsync(controllerReviews.createReview));
//delete review route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(controllerReviews.deleteReview));

module.exports = router;