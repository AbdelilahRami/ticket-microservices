import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@arstickets/common';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = '';
  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found ');
    }

    ticket.set({ orderId: data.id });
    await ticket.save();

    message.ack();
  }
}
