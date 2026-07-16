import express from 'express';
import books from './db.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({message : 'Hello World'});
});

app.get('/books', (req, res) => {
    const {limit=10,page=1,search =""}=req.query;
    const filteredBooks = books.filter(b => b.name.includes(search));

    const startIndex = (+page - 1) * (+limit);
    const endIndex = startIndex + (+limit);
    
    const result = filteredBooks.slice(startIndex, endIndex);
    
    res.status(200).json({
        page: +(page),
        limit: +(limit),
        totalItems: filteredBooks.length,
        data: result

    });

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
    res.status(201).json(books);
    }
});


app.post('/books/:bookId/:userId', (req, res) => {
    const book = books.find(b => b.code === +(req.params.bookId));
    if (!book) {
        return res.status(404).json({ error: "Book ID not found!" }); 
    }
    if (book.isBorrowed) {
        return res.status(400).json({ error: "This book is already borrowed!" });
    }
    book.isBorrowed = true;
    const currentDate = new Date().toISOString().split('T')[0];
    const newLoan = {
        date: currentDate,
        customerCode: +(req.params.userId)
    };
    if (!book.loans) {
        book.loans = [];
    }
    book.loans.push(newLoan);
    
    res.status(200).json(book);
});

app.post('/books/:bookId',(req,res)=>{
    const book = books.find(b => b.code === +(req.params.bookId));
    if(!book){
        res.status(409).json({error:"book ID didnt found!"}); 
    }
    else{
    book.isBorrowed=false;
    res.status(201).json(books);
    }
});

app.delete('/books/:bookId',(req,res)=>{
    const bookIndex = books.findIndex(b => b.code === +(req.params.bookId));
    if (bookIndex === -1) {
        res.status(404).json({ error: "Book ID not found!" }); 
    }
    else {
        const deletedBook = books.splice(bookIndex, 1); 
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});