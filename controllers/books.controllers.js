import { isValidObjectId } from "mongoose";
import {Book} from '../models/book.model.js'; 
import {User} from '../models/user.model.js'
export const getAllBooks = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, search = '' } = req.query;
        const filter = search ? { name: new RegExp(search, 'i') } : {};
        const result = await Book.find( filter)
            .skip((page - 1) * limit)
            .limit(limit);
        
        
        res.status(200).json({
            page: +(page),
            limit: +(limit),
            totalItems: await Book.countDocuments(filter),
            data: result
        });
    } catch (err) { 
        next(err); 
    }
};

export const getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

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

export const addBook = async (req, res, next) => {
    try {
        if (req?.body && Object.keys(req.body).length > 0) {
            const newBook = await Book.create(req.body);
            return res.status(201).json(newBook);
        } else {
            const error = new Error('Book data is required');
            error.status = 400;
            throw error;
        }
    } catch (err) { 
        return next(err); 
    }
};
export const updateBook = async (req, res, next) => {
    try {

        const book = await Book.findByIdAndUpdate(req.params.id, req.body , { new: true,runValidators: true });
        
        if (!book) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
       
        return res.status(200).json(book);
    } catch (err) { 
        return next(err); 
    }
};

export const makeBorrow = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
        
        const user = await User.findById(req.params.userId);
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
            customerCode: (req.params.userId)
        };
        
        if (!book.loans) book.loans = [];
        book.loans.push(newLoan);
        
        if (!user.loans) user.loans = [];
        user.loans.push({ bookCode: book._id, bookName: book.name });
        
        await user.save();
        await book.save();
        return res.status(200).json(book);

    } catch (err) { 
        return next(err); 
    }
};

export const makeReturn = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;
        }
        
        const user = await User.findById(req.params.userId);
        if (!user) {
            const error = new Error('User code not found!');
            error.status = 404;
            throw error;
        }

        book.isBorrowed = false;
    if (user.loans) {
    user.loans = user.loans.filter(loan => loan.bookCode.toString() !== req.params.bookId);
    }        
        await user.save();
        await book.save();
        return res.status(200).json(book);
    } catch (err) { 
        return next(err); 
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            const error = new Error('Book ID not found!');
            error.status = 404;
            throw error;    
        }
        return res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (err) { 
        return next(err); 
    }
};

export const getBooksByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const books = await Book.find({ category });
        
        return res.status(200).json(books);
    } catch (err) {
        return next(err);
    }
};