const mongoose = require("mongoose");
const initData = require("./data.js");
const Category = require("../models/category.js");

const mongo_url = "mongodb://127.0.0.1:27017/Pharamacy4U";

main()
.then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
}) 

async function main() {
    await mongoose.connect(mongo_url);
}

const initDB = async () => {
    await Category.deleteMany({});
    await Category.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();