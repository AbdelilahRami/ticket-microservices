import { TicketUpdatePublisher } from './../publishers/ticket-updated-publisher';
import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@arstickets/common';
import { Ticket } from '../../models/ticket';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = 'order:cancelled';

  async onMessage(data: OrderCancelledEvent['data'], message: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Not found ticket');
    }

    ticket.set({ orderId: undefined });
    await ticket.save();
    await new TicketUpdatePublisher(this.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      version: ticket.version,
      orderId: ticket.orderId,
      userId: ticket.userId,
    });
    message.ack();
  }
}
