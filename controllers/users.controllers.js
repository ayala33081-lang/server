import {User} from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users= await User.find();
        return res.status(200).json(users);
    } catch (err) { 
        return next(err); 
    }
};

export const signUp = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
       
        if (!name || !email || !phone || !password) {
            const error = new Error('Name, email, phone and password are required');
            error.status = 400;
            throw error;
        }
        
        const newUser = await User.create({ name, email, phone, password });
        return res.status(201).json(newUser);
    } catch (err) { 
        return next(err); 
    }    
};

export const signIn = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isMatch = await user.comparePassword(password);

        if ( !email || !isMatch) {
            const error = new Error('Email and password are required');
            error.status = 400;
            throw error;
        }
        
        const user = await User.findOne({ email, password });

        if (!user) {
            const error = new Error('Invalid email or password');
            error.status = 401;
            throw error;    
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (err) { 
        return next(err); 
    }
};