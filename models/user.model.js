import { model, Schema } from "mongoose";

const phoneRegex = /^0(5[0-9]|[23489])-?[0-9]{7}$/;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,      
        lowercase: true,   
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        match: [phoneRegex, "Invalid Israeli phone number"] 
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password must be at least 4 characters"] 
    },
    registrationDate: {
        type: Date,
        default: Date.now 
    },
    loans: [{
        bookName: String,
        bookCode: String
    }]
});

export const User = model('user', userSchema);