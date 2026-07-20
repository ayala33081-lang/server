import express from 'express';
import {
    getAllUsers,
    signUp,
    signIn
} from '../controllers/users.controllers.js';
import { validateSignUp, validateSignIn } from '../middlewares/validation.middleware.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/sign-up', validateSignUp, signUp);
router.post('/sign-in', validateSignIn, signIn);

export default router;