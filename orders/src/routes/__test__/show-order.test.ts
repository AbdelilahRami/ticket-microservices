import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order } from '../../models/order';
import { OrderStatus } from '@arstickets/common';

it('returns 404 when orderId not found', async () => {
  const randomId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    title: 'movie 3D',
    price: 30,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  ticket.save();
  const order = Order.build({
    ticket,
    userId: 'userId',
    expiresAt: new Date(),
    status: OrderStatus.Created,
  });
  order.save();

  const response = await request(app)
    .get(`/api/orders/${randomId}`)
    .set('Cookie', global.signin())
    .expect(404);
});

it('returns 200 when orderId exists', async () => {
  const randomId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'movie 3D',
    price: 30,
  });
  await ticket.save();
  const cookie = global.signin();
  const createdOrder = await request(app)
    .post('/api/orders/')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  const response = await request(app)
    .get(`/api/orders/${createdOrder.body.id}`)
    .set('Cookie', cookie)
    .expect(200);
});

it('returns 401 when the order doesnt belong the user (userId)', async () => {
  const randomId = new mongoose.Types.ObjectId().toHexString();
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'movie 3D',
    price: 30,
  });
  await ticket.save();
  const cookie = global.signin();
  const createdOrder = await request(app)
    .post('/api/orders/')
    .set('Cookie', cookie)
    .send({ ticketId: ticket.id })
    .expect(201);

  const response = await request(app)
    .get(`/api/orders/${createdOrder.body.id}`)
    .set('Cookie', global.signin())
    .expect(401);
});
