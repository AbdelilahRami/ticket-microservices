import { NotFoundError } from '@arstickets/common';
import express, {Request, Response, NextFunction} from 'express';
import {Ticket} from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response)=> {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        console.log('No ticket');
        return res.sendStatus(404);
    }

     res.status(200).send(ticket);
    
});

export {router as showTicketRouter};