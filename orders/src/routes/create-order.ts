import { OrderStatus, currentUser, BadRequestError } from "@arstickets/common";
import mongoose from "mongoose";
import { body } from "express-validator";
import express, { Request, Response } from "express";
import {
  requireAuth,
  requestValidator,
  NotFoundError,
} from "@arstickets/common";
import { Ticket } from "../models/ticket";
import { Order } from "../models/order";
const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [body("ticketId").not().isEmpty().withMessage("ticketId must be provided ")],
  requestValidator,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    const isReserved = await ticket.isReserved();
    if (isReserved) {
      console.log("ReserVed");
      throw new BadRequestError("Ticket already reserved");
    }

    const expiration = new Date();
    expiration.setMinutes(15);

    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket: ticket,
    });
    order.save();
    res.status(201).send(order);
  }
);

export { router as createOrderRouter };
