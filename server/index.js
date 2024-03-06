import dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import mongoose from 'mongoose';
import {registerValid} from './validations/auth.js';

import authMiddleware from './middleware/authMiddleware.js';
import * as UserController from './controllers/UserController.js';

mongoose
.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.5su4pcy.mongodb.net/blog?retryWrites=true&w=majority`)
.then(() => console.log('DB ok'))
.catch(err => console.log('DB error', err))

const app = express();

app.use(express.json());

app.post('/auth/login', UserController.login)

app.post('/auth/reg', registerValid, UserController.register)

app.get('/auth/me', authMiddleware, UserController.checkUser)

app.listen(process.env.PORT || 4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('server ok');
})