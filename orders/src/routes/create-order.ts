import  mongoose  from 'mongoose';
import { body } from 'express-validator';
import express, {Request, Response} from 'express';
import {requireAuth, requestValidator} from '@arstickets/common';
const router = express.Router();

router.post('/api/orders',requireAuth,[
    body('title')
    .not()
    .isEmpty()
    custom((input:string)=> mongoose.Types.ObjectId.isValid(input))
],async(req:Request, res: Response)=> {
    res.send({});
});

export { router as createOrderRouter};