import express from 'express';
import indexRouter from './routes/index.route.js';

const app = express();
app.use(express.json());
app.use('/api',indexRouter);

app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World'});
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});