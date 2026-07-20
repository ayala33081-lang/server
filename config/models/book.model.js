import { model, Schema } from "mongoose";

const bookSchema = new Schema({
    name: String,
    price: Number,
    categories: [String],
    writer:{name:String,phone:String,email:String}
});

// products מגדיר אוסף בשם
// שכל איבר בו מסוג הסכמה
// Product - מודל - מחלקה שניתן לגשת דרכה לאוסף המוצרים
export const Book = model('book', bookSchema);