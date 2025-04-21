const monoose = require("mongoose");
const Schema = monoose.Schema;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
   
});

module.exports = monoose.model("Review", reviewSchema);