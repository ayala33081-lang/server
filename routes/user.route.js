import express from 'express';
import users from '../users.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json(users);
});

router.post('/sign-up', (req, res) => {
    const {code, username, email, password } = req.body;
   
    if (!code||!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email or password are required' });
    }

    const userExists = users.some(u => u.code===code||u.email === email || u.username === username);
    if (userExists) {
        return res.status(409).json({ error: 'User already exists' });
    }
    
    const newUser={
        code,
        username,
        email,
        password,
        borrowedBookCodes: []
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

router.post('/sign-in', (req, res) => {
    const { code,username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    const user = users.find(u =>u.code===code&& u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', user });
});

export default router;