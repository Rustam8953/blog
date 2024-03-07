import {body} from 'express-validator';

export const registerValid = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Неверный формат пароля").isLength({min: 5}),
    body('fullName', "Укажите имя").isLength({min: 3}),
    body('avatarUrl', "Неверная ссылка на аватар").optional().isURL(),
]

export const loginValid = [
    body('email', "Неверный формат почты").isEmail(),
    body('password', "Неверный формат пароля").isLength({min: 5})
]

export const postCreateValid = [
    body('title', "Введите заголовк страницы").isLength({min: 5}).isString(),
    body('text', "Заполните содержимое статьи").isLength({min: 50}).isString(),
    body('tags', "Неверный формат тегов").optional().isString(),
    body('imageUrl', "Неверная ссылка на изображение").optional().isURL(),
]