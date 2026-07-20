import express from 'express';
import {
    getAllBooks,
    getBookById,
    addBook,
    updateBook,
    makeBorrow,
    makeReturn,
    deleteBook
} from '../controllers/books.controllers.js';
import { validateBook } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, addBook);
router.put('/:id', validateBook, updateBook);
router.post('/borrow/:bookId/:userId', makeBorrow);
router.post('/return/:bookId/:userId', makeReturn);
router.delete('/:bookId', deleteBook);

export default router;