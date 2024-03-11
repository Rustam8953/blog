import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import multer from "multer";
import cors from 'cors';

import mongoose from 'mongoose';
import {registerValid, loginValid, postCreateValid} from './validations/valid.js';

import {UserController, PostController} from './controllers/index.js';
import { authMiddleware, handleValid } from './middleware/index.js';

mongoose
.connect(`mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.5su4pcy.mongodb.net/blog?retryWrites=true&w=majority`)
.then(() => console.log('DB ok'))
.catch(err => console.log('DB error', err))

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

app.use(express.json());
app.use(cors());
app.use('/upload', express.static('uploads'))

app.post('/auth/login', loginValid, handleValid, UserController.login)
app.post('/auth/reg', registerValid, handleValid, UserController.register)
app.get('/auth/me', authMiddleware, UserController.checkUser)

app.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`
    })
});

app.post('/posts', authMiddleware, postCreateValid, handleValid, PostController.create)
app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.delete('/posts/:id', authMiddleware, PostController.removePost);
app.patch('/posts/:id', authMiddleware, handleValid, PostController.update);

app.listen(process.env.PORT || 4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('server ok');
})