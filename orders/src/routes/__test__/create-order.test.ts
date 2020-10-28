import { OrderStatus } from "@arstickets/common";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { Ticket } from "../../models/ticket";
import { Order } from "../../models/order";

it("returns en error if ticket not found", async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .post("/api/orders/")
    .set("Cookie", global.signin())
    .send({ ticketId })
    .expect(404);
});

it("returns en error if ticket is already reserved ", async () => {
  const ticket = Ticket.build({
    title: "Match de foot",
    price: 50,
  });
  await ticket.save();
  const order = Order.build({
    ticket,
    userId: "userId",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();

  const response = await request(app)
    .post("/api/orders/")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(400);
});

it("reserves the ticket", async () => {
  const ticket = Ticket.build({
    title: "UFC fight",
    price: 500,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});
