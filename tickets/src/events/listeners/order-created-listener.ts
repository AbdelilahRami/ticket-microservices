import { TicketUpdatePublisher } from './../publishers/ticket-updated-publisher';
import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@arstickets/common';
import { Ticket } from '../../models/ticket';

export class OrderCreatedListner extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = 'tickets-service';
  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    console.log('Listening from tickets service');
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found ');
    }

    ticket.set({ orderId: data.id });
    await ticket.save();
    // await new TicketUpdatePublisher(this.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    //   orderId: ticket.orderId,
    //   version: ticket.version,
    // });
    message.ack();
  }
}
