import express from 'express';
import indexRouter from './routes/index.route.js';

import express from 'express';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

app.use(cors());

app.use(morgan('dev'));

// Middleware: מוסיף כותרות אבטחה בסיסיות לשרת
app.use(helmet());

// Middleware: מגביל את קצב הבקשות מלקוח כדי למנוע הצפת השרת
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 דקות
    max: 100 // הגבלה ל-100 בקשות לכל IP
});
app.use(limiter);

app.use(express.json());


const app = express();
app.use(express.json());
app.use('/api',indexRouter);

app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World'});
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});