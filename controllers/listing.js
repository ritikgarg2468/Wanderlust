const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.new = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate: {
            path: "author",
        }
    })
    .populate("owner");
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    };
    res.render("listings/show.ejs", { listing });
};

module.exports.create = async (req, res) => {
    let url = req.file.path;
    let filename = req.file.filename;
    //------------- Joi method to validate the data before saving it to the database. or Schema validation.-----------
    //-----but we use joi by function = validateListing (line 56)-----
    // let result = listingSchema.validate(req.body);
    // if (result.error) { 
    //     throw new ExpressError(400, result.error);
    // };
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    //--------------------------------------------------------------------------------------------------------------------------
    //------------- Simple method to validate the data before saving it to the database. or Schema validation.-----------
    // if(!req.body.listing) throw new ExpressError(400, "Invalid listing details");
    // if(!newListing.discription) throw new ExpressError(400, "Doscription is required");
    // if(!newListing.location) throw new ExpressError(400, "Location is required");
    // if(!newListing.country) throw new ExpressError(400, "Country is required");
    // if(!newListing.price) throw new ExpressError(400, "Price is required");
    //-------------------------------------------------------------------------------------------------------------------
    await newListing.save();
    req.flash("success", "New listing created successfully!");
    res.redirect("/listings");
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    };
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.update = async (req, res) => {
    let { id } = req.params;
    // let listing = await Listing.findById(id);
    // if(!currentUser && listing.owner._id.equals(res.locals.currentUser._id)) {
    //     req.flash("error", "You don't have permission to do that!");
    //     return res.redirect(`/listings/${id}`);
    // }
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if ( typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "Listing updated successfully!")
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!")
    res.redirect("/listings");
};