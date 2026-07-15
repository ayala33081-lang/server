import express from 'express';
import books from './db.js';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message : 'Hello World'});
});