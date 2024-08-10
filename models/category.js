const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    image : {
        type : String ,
        default :
        "https://unsplash.com/photos/trees-under-blue-sky-and-stars-during-nighttime-photo-T26KCgCPsCI",
        set : (v) => v === "" ? "https://unsplash.com/photos/trees-under-blue-sky-and-stars-during-nighttime-photo-T26KCgCPsCI"
         : v,
    },
    title : {
        type :String,
        required : true,
    },
});

const Category = mongoose.model("Category" , categorySchema);

module.exports = Category;