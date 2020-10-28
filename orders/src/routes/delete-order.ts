import { requireAuth, NotFoundError, OrderStatus, NotAuthorizedError } from '@arstickets/common';
import express, {Request, Response} from 'express';
import { Order } from '../models/order';

const router = express.Router();

router.delete('/api/orders/:orderId',requireAuth,async(req:Request, res: Response)=> {
    const orderId = req.params.orderId;
    const order =await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }

    if(req.currentUser!.id !== order.userId){
        throw new NotAuthorizedError();
    }
    
    order.status = OrderStatus.Cancelled;
    await order.save();
    res.status(204).send(order);
});

export { router as deleteOrderRouter};