import { Listener, Subjects, TicketUpdateEvent } from '@arstickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = 'order:service';
  async onMessage(data: TicketUpdateEvent['data'], msg: Message) {
    const { id, version, title, price } = data;
    const ticketVersion = await Ticket.findOne({ _id: id });
    const ticket = await Ticket.findOne({ _id: id, version: version - 1 });

    if (!ticket) {
      throw new Error('Ticket Not Found ');
    }
    ticket.set({ price, title });
    await ticket.save();
    msg.ack();
  }
}
