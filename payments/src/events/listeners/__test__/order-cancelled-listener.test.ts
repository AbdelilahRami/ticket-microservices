import { Message } from 'node-nats-streaming';
import { OrderCancelledEvent, OrderStatus } from '@arstickets/common';
import mongoose from 'mongoose';
import { Order } from '../../../models/order';
import { natsWrapper } from './../../../nats-wrapper';
import { OrderCancelledListener } from './../order-cancel-listener';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    orderStatus: OrderStatus.Created,
    price: 10,
    userId: 'abcd',
    version: 0,
  });
  await order.save();
  console.log('order ', order);
  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'azer',
      price: 34,
      title: 'title',
    },
    expiresAt: 'expiresAt',
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it('updates the status of the order', async () => {
  const { listener, order, msg, data } = await setup();
  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);
  expect(updatedOrder!.orderStatus).toEqual(OrderStatus.Cancelled);
});
