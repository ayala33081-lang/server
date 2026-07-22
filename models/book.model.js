import { model, Schema } from "mongoose";

const CATEGORIES = ["Fiction", "Non-Fiction", "Children", "Comics", "Biography", "General"];
const bookSchema = new Schema({
    name: {type: String,
        required: [true, "Book name is required"],
        unique: true,
        minlength: [2, "Book name must be at least 2 characters"],
        maxlength: [20, "Book name cannot exceed 20 characters"], 
        trim: true},
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },
    categories: {type: String,
        required: [true, "Category is required"],
        enum: {
            values: CATEGORIES,
            message: '{VALUE} is not a valid category'
        }},
    writer:{name:String,phone:String,email:String}
});

// products מגדיר אוסף בשם
// שכל איבר בו מסוג הסכמה
// Product - מודל - מחלקה שניתן לגשת דרכה לאוסף המוצרים
export const Book = model('book', bookSchema);