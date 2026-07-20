import books from '../db.js'; 
import users from '../users.js';

export const getAllBooks = (req, res, next) => {
    try {
        const { limit = 10, page = 1, search = "" } = req.query;
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
    } catch (err) { 
        next(err); 
    }
};

export const getBookById = (req, res, next) => {
    try {
        const book = books.find(b => b.code === +(req.params.id));

        if (book) {
            return res.json(book);
        } else {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
    } catch (err) { 
        return next(err); 
    }
};

export const addBook = (req, res, next) => {
    try {
        if (req?.body && Object.keys(req.body).length > 0) {
            books.push(req.body);
            return res.status(201).json(req.body);
        } else {
            const error = new Error('Book data is required');
            error.status = 400;
            throw error;
        }
    } catch (err) { 
        return next(err); 
    }
};

export const updateBook = (req, res, next) => {
    try {
        const book = books.find(b => b.code === +(req.params.id));
        
        if (!book) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
        
        book.category = req.body.category;
        book.name = req.body.name;
        book.price = req.body.price;

        return res.status(200).json(books);
    } catch (err) { 
        return next(err); 
    }
};

export const makeBorrow = (req, res, next) => {
    try {
        const book = books.find(b => b.code === +(req.params.bookId));
        if (!book) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
        
        const user = users.find(u => u.code === +req.params.userId);
        if (!user) {
            const error = new Error('User code not found!');
            error.status = 404;
            throw error;
        }
        
        if (book.isBorrowed) {
            const error = new Error('This book is already borrowed!');
            error.status = 400;
            throw error;    
        }
        
        book.isBorrowed = true;
        const currentDate = new Date().toISOString().split('T')[0];
        const newLoan = {
            date: currentDate,
            customerCode: +(req.params.userId)
        };
        
        if (!book.loans) book.loans = [];
        book.loans.push(newLoan);
        
        if (!user.borrowedBookCodes) user.borrowedBookCodes = [];
        user.borrowedBookCodes.push(+req.params.bookId);
        
        return res.status(200).json(book);
    } catch (err) { 
        return next(err); 
    }
};

export const makeReturn = (req, res, next) => {
    try {
        const book = books.find(b => b.code === +(req.params.bookId));
        if (!book) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
        
        const user = users.find(u => u.code === +req.params.userId);
        if (!user) {
            const error = new Error('User code not found!');
            error.status = 404;
            throw error;
        }

        book.isBorrowed = false;
        user.borrowedBookCodes = user.borrowedBookCodes.filter(id => id !== +req.params.bookId);    
        
        return res.status(200).json(books);
    } catch (err) { 
        return next(err); 
    }
};

export const deleteBook = (req, res, next) => {
    try {
        const bookIndex = books.findIndex(b => b.code === +(req.params.bookId));
        if (bookIndex === -1) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;    
        }
        
        const deletedBook = books.splice(bookIndex, 1); 
        return res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (err) { 
        return next(err); 
    }
};