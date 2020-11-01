import { Listener, Subjects, TicketUpdateEvent } from '@arstickets/common';
import { Message } from 'node-nats-streaming';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = 'order:service';
  async onMessage(data: TicketUpdateEvent['data'], msg: Message) {
    const { id, version, title, price } = data;
    console.log('Version in update ', version);
    const ticket = await Ticket.findOne({ _id: id, version: version });

    if (!ticket) {
      throw new Error('Ticket Not Found ');
    }
    ticket.set({ price, title });
    await ticket.save();
    console.log('Version of thicket after update ', ticket.version);
    msg.ack();
  }
}
