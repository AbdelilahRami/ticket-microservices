import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { OrderCreatedEvent } from '@arstickets/common';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../__mocks__/nats-wrapper';
import { OrderCreatedListner } from './../order-created-listener';

const setup = async () => {
  //@ts-ignore
  const listener = new OrderCreatedListner(natsWrapper.client);

  const ticket = Ticket.build({
    title: 'concertr',
    price: 23,
    userId: 'userId',
  });
  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: 'userId2',
    ticket: {
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
    },
    version: ticket.version,
    expiresAt: 'expiration',
  };
  //@ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, message };
};

it('should set the orderId to the ticket', async () => {
  const { listener, data, ticket, message } = await setup();

  await listener.onMessage(data, message);
  const updatedticket = await Ticket.findById(ticket.id);
  expect(data.id).toEqual(updatedticket!.orderId);
});

it('should call ack message', async () => {
  const { listener, data, ticket, message } = await setup();

  await listener.onMessage(data, message);
  const updatedticket = await Ticket.findById(ticket.id);
  expect(message.ack).toBeCalled();
});
