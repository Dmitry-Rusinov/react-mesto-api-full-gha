import { Router } from 'express';
import {
  loginValidation,
  createUserValidation,
} from '../middlewares/requestValidation.js';
import { createUser, login, logout } from '../controllers/users.js';

const adminsRouter = Router();

adminsRouter.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
adminsRouter.post('/signin', loginValidation, login);
adminsRouter.post('/signup', createUserValidation, createUser);
adminsRouter.get('/logout', logout);

export default adminsRouter;
