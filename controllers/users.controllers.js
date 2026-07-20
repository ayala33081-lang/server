import users from '../users.js';

export const getAllUsers = (req, res, next) => {
    try {
        return res.status(200).json(users);
    } catch (err) { 
        return next(err); 
    }
};

export const signUp = (req, res, next) => {
    try {
        const { code, username, email, password } = req.body;
       
        if (!code || !username || !email || !password) {
            const error = new Error('Username, email, code and password are required');
            error.status = 400;
            throw error;
        }

        const userExists = users.some(u => u.code === code || u.email === email || u.username === username);
        if (userExists) {
            const error = new Error('User already exists');
            error.status = 409;
            throw error;    
        }
        
        const newUser = {
            code,
            username,
            email,
            password,
            borrowedBookCodes: []
        };

        users.push(newUser);
        return res.status(201).json(newUser);
    } catch (err) { 
        return next(err); 
    }    
};

export const signIn = (req, res, next) => {
    try {
        const { code, username, password } = req.body;

        if (!username || !password || !code) {
            const error = new Error('Username, code and password are required');
            error.status = 400;
            throw error;
        }
        
        const user = users.find(u => u.code === code && u.username === username && u.password === password);

        if (!user) {
            const error = new Error('Invalid username, code or password');
            error.status = 401; // 401 מתאים לפרטי הזדהות שגויים
            throw error;    
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (err) { 
        return next(err); 
    }
};