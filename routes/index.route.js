import express from 'express';
import { Router } from "express";
const router = Router();

import userRouter from './user.route.js'; 
import booksRouter from './books.route.js';

router.use('/user', userRouter);
router.use('/books',booksRouter);

export default router;
