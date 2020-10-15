import express, { Request, Response } from 'express';
import { requireAuth, requestValidator, NotFoundError, NotAuthorizedError } from '@arstickets/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
const router = express.Router()

router.put('/api/tickets/:id', requireAuth, [
    body('title').not().isEmpty().withMessage('Title is required !'),
    body('price').not().isEmpty().withMessage('price is required !')
], requestValidator, async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id){
        throw new NotAuthorizedError();
    }
    const {title, price} = req.body;
    ticket.set({
        title: title,
        price:price
    });
    ticket.save();

    res.send(ticket);

});
export {router as updateticketRouter};