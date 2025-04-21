const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const controllerListing = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    };
};
//commen route for same path but diff req type
router
    .route("/")
    .get(wrapAsync(controllerListing.index))
    .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controllerListing.create)
);

//new route (keen upon show route becaz server conider listings/new = lintings/:id ) 
router.get("/new", isLoggedIn, controllerListing.new);

//common route for same path but diff req type
router.route("/:id")
    .get(wrapAsync(controllerListing.show))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(controllerListing.update)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(controllerListing.delete)
);


// edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(controllerListing.edit));

module.exports = router;