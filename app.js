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

app.post('/books',(req,res)=>{
    if(req?.body){
        books.push(req.body);
        res.status(201).json(req.body);
    }
    else{
        res.status(409).json({ error: 'books is required' });
    }
});

app.put('/books/:id',(req,res)=>{
    const book = books.find(b => b.code === +(req.params.id));
    if(!book){
        res.status(409).json({error:"id didnt found!"}); 
    }
    else{
    book.category=req.body.category;
    book.name=req.body.name;
    book.price=req.body.price;
    book.isBorrowed=false;
    books.push(book);
    res.status(201).json(books);
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});