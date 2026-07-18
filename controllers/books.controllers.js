import books from '../db.js'; 
import users from '../users.js';

export const getAllBooks = (req, res) => {
    const {limit=10, page=1, search =""} = req.query;
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
};

export const getBookById = (req, res) => {
  const book = books.find(b => b.code === +(req.params.id));

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'הספר לא נמצא' });
  }
};

export const addBook = (req, res) => {
    if(req?.body){
        books.push(req.body);
        res.status(201).json(req.body);
    }
    else{
        res.status(409).json({ error: 'books is required' });
    }
};

export const updateBook = (req, res) => {
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
};

export const makeBorrow = (req, res) => {
    const book = books.find(b => b.code === +(req.params.bookId));
    if (!book) {
        return res.status(404).json({ error: "Book ID not found!" }); 
    }
    const user = users.find(u => u.code === +req.params.userId);
    if(!user){
        return res.status(404).json({ error: "user code not found!" }); 
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
    if (!user.borrowedBookCodes) user.borrowedBookCodes = [];
    user.borrowedBookCodes.push(+req.params.bookId);
    
    res.status(200).json(book);
};

export const makeReturn = (req, res) => {
    const book = books.find(b => b.code === +(req.params.bookId));
    if(!book){
        res.status(409).json({error:"book ID didnt found!"}); 
    }
    else{
        book.isBorrowed=false;
        const user=users.find(u=>u.code=== +req.params.userId);
        user.borrowedBookCodes = user.borrowedBookCodes.filter(id => id !== +req.params.bookId);    
        res.status(200).json(books);
    }
};

export const deleteBook = (req, res) => {
    const bookIndex = books.findIndex(b => b.code === +(req.params.bookId));
    if (bookIndex === -1) {
        res.status(404).json({ error: "Book ID not found!" }); 
    }
    else {
        const deletedBook = books.splice(bookIndex, 1); 
        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    }
};