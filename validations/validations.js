import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'invalid email').isEmail(), 
    body('password', 'password min 5 chars').isLength({min: 5}), 
]

export const registerValidation = [
    body('email', 'invalid email').isEmail(), 
    body('password', 'password min 5 chars').isLength({min: 5}), 
    body('fullName', 'name min 3 chars').isLength({min: 3}), 
    body('avatarUrl', 'avatar is not a url').optional().isURL(), 
]

export const postCreateValidation = [
    body('title', 'input title of article').isLength({min: 3}).isString(), 
    body('text', 'input content of article').isLength({min: 3}).isString(), 
    body('tags', 'invalid format tags (input array)').optional().isString(), 
    body('imageUrl', 'invalid url').optional().isString(), 
]