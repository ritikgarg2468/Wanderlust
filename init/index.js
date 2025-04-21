const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb+srv://Wanderlust:g8tJAKkTegvFGDRk@cluster0.k2equo8.mongodb.net/";

async function dbConnect() {
    await mongoose.connect(MONGO_URL);
};

dbConnect().then(() => {
    console.log("Connected to DB");
}).catch((err) => {
    console.log(err);
});

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((item) => ({
            ...item,
            owner: '6806671c1b01f0764cb4ef8a',
          
    }));
    await Listing.insertMany(initData.data);
    console.log("DB init");
};

initDB();