import {body} from 'express-validator';

export const registerValid = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Неверный формат пароля").isLength({min: 5}),
    body('fullName', "Укажите имя").isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка на аватар").optional().isURL(),
]