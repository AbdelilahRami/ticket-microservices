import { natsWrapper } from './../nats-wrapper';
import {
  requireAuth,
  NotFoundError,
  OrderStatus,
  NotAuthorizedError,
} from "@arstickets/common";
import express, { Request, Response } from "express";
import orderCancelledPublisher from "../events/publisher/order-cancelled-publisher";
import { Order } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response) => {
    const orderId = req.params.orderId;
    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (req.currentUser!.id !== order.userId) {
      throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();
    await new orderCancelledPublisher(natsWrapper.client).publish({
      id:order.id,
      userId: order.userId,
      version:order.version,
      ticket: {
        id: order.ticket.id,
        title: order.ticket.title,
        price: order.ticket.price
      },
      expiresAt: order.expiresAt.toISOString()
    })
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
