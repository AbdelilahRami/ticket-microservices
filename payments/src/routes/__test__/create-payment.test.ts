import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@arstickets/common';

it('should return 400 bad request request when orderId is not provided', async () => {
  const response = await request(app)
    .post('/api/payments')
    .send({ token: '', oroderId: '' })
    .set('Cookie', global.signin())
    .expect(400);
});

it('respond with 401 when the order doesnt belong to the user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    orderStatus: OrderStatus.Created,
    userId: 'userId',
    price: 12,
  });

  await order.save();

  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'token',
      orderId: order.id,
    })
    .expect(401);
});

it('respond wth 200 OK when thr order BELONGS to the user', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const cookie = global.signin(userId);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    orderStatus: OrderStatus.Created,
    userId: userId,
    price: 12,
  });

  await order.save();

  const response = request(app)
    .post('/api/payments')
    .send({ token: 'token', orderId: order.id })
    .set('Cookie', cookie)
    .expect(200);
});
