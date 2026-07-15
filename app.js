import express from 'express';
import books from './db.js';
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World'});
});

app.get('/books', (req, res) => {
    res.status(201).json(books);
});

app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.code === +(req.params.id));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'הספר לא נמצא' });
  }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});