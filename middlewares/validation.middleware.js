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