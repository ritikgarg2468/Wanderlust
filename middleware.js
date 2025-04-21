const Listing = require("./models/listing"); // Assuming you have a Listing model
const Review = require("./models/review"); // Assuming you have a Review model

//we can add validateListing middleware here to validate the data before saving it to the database.
// And validateReview middleware to validate the data before saving it to the database.
// (with their requirements and require them at the top of the file where we want to use them.)
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl; // Store the original URL
        req.flash("error", "You must be logged in first!");
        return res.redirect("/login");
    };
    next();
};

module.exports.saveReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo; // Store the original URL
    };
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currentUser._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/listings/${id}`);
    };
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You don't have permission to do that!");    
        return res.redirect(`/listings/${id}`);
    };
    next();
};
