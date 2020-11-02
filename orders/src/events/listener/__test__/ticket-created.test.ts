import { natsWrapper } from './../../../__mocks__/nats-wrapper';
import { TicketCreateEvent } from '@arstickets/common';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';

import { TicketCreatedListener } from '../ticket-created-listener';
import { Ticket } from '../../../models/ticket';
const setup = () => {
  // @ts-ignore
  const listener = new TicketCreatedListener(natsWrapper.client);
  const data: TicketCreateEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Title',
    price: 23,
    version: 0,
    userId: 'userId',
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
    const { listener, data, msg } = await setup();
  
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
  
    // write assertions to make sure a ticket was created!
    const ticket = await Ticket.findById(data.id);
  
    expect(ticket).toBeDefined();
    expect(ticket!.title).toEqual(data.title);
    expect(ticket!.price).toEqual(data.price);
  });
  
  it('acks the message', async () => {
    const { data, listener, msg } = await setup();
  
    // call the onMessage function with the data object + message object
    await listener.onMessage(data, msg);
  
    // write assertions to make sure ack function is called
    expect(msg.ack).toHaveBeenCalled();
  });