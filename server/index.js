import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import {registerValid} from './validations/auth.js';
import UserModel from './models/User.js';

import authMiddleware from './middleware/authMiddleware.js';

mongoose
.connect('mongodb+srv://orunbaevr848:89537845840Rustam@cluster0.eh65nx9.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('DB ok'))
.catch(err => console.log('DB error', err))

const app = express();

app.use(express.json());

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if(!user) {
            return res.status(404).json({
                message: 'Произошла ошибка',
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if(!isValidPass) {
            return res.status(404).json({
                message: "Ошибка при вводе логина и пароля",
            })
        }
        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d'
        });
        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Не удалось авторизоваться'
        })
    }
})

app.post('/auth/reg', registerValid, async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl
        })
        const user = await doc.save();
        const token = jwt.sign({
            _id: user._id
        }, 'secret123', {
            expiresIn: '30d'
        });
        const {passwordHash, ...userData} = user._doc;
        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Не удалось зарегестрироваться"
        })
    }
})

app.get('/auth/me', authMiddleware, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if(!user) {
            return res.status(404).json({
                message: "Отсутствует пользователь"
            })
        }
        const {passwordHash, ...userData} = user._doc;
        res.json(userData);
    } catch (error) {
        res.status(500).json({
            message: "Нет доступа"
        })
    }
})

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log('server ok');
})