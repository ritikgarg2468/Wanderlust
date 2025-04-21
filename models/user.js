const monoose = require("mongoose");
const Schema = monoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});
userSchema.plugin(passportLocalMongoose);

module.exports = monoose.model("User", userSchema);