import { Message } from 'node-nats-streaming';
import { OrderCreatedEvent } from '@arstickets/common';
import { natsWrapper } from '../../../nats-wrapper';
import { OrderCreatedListener } from '../order-created-listener';
import mongoose from 'mongoose';
import { Order } from '../../../models/order';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: 'userId',
    version: 0,
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: 14,
      title: 'Concert',
    },
    expiresAt: 'expiresAt',
  };
  //@ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, data, message };
};

it('should create and save the order when event is received', async () => {
  const { listener, data, message } = await setup();

  await listener.onMessage(data, message);
  const order = await Order.findById(data.id);
  expect(order!.id).toEqual(data.id);
});
