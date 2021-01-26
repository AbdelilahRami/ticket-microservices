import { BadRequestError } from '@arstickets/common';
import express, { request, Request, Response } from 'express';
import {
  requireAuth,
  requestValidator,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@arstickets/common';
import { body } from 'express-validator';
import { Order } from '../models/order';
import Stripe from 'stripe';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('Token is invalid'),
    body('orderId').not().isEmpty().withMessage('OrderId is invalid '),
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== order.userId) {
      throw new NotAuthorizedError();
    }

    if (order.orderStatus === OrderStatus.Cancelled) {
      throw new BadRequestError('Order is already cancelled !');
    }

    const stripe = new Stripe(process.env.STRIPE_KEY!, {
      apiVersion: '2020-08-27',
    });

    await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 1000,
      source: token,
    });

    res.send({ success: true });
  }
);

export { router as paymentRouter };
