import { bookSchema } from "../validators/book.validator.js";
import { signUpSchema,signInSchema } from "../validators/user.validator.js";

export const validateBook=(req,res,next)=>{
    try{
    const {error}=bookSchema.validate(req.body);
    if(error){
        const cusErr=new Error(error.details[0].message);
        cusErr.status=400;
        throw cusErr;
    }
    next();
    }
    catch(err){
    next(err);
    }
};

export const validateSignUp=(req,res,next)=>{
    try{
    const {error} =signUpSchema.validate(req.body);
    if(error){
        const cusErr=new Error(error.details[0].message);
        cusErr.status=400;
        throw cusErr;
    }
    next();
    }
    catch(err){next(err);}
};

export const validateSignIn = (req, res, next) => {
    try {
        const { error } = signInSchema.validate(req.body);
        if (error) {
            const customError = new Error(error.details[0].message);
            customError.status = 400;
            throw customError;
        }
        next();
    } catch (err) {
        next(err);
    }
};