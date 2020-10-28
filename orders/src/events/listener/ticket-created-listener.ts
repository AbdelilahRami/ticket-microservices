import { Listener } from "@arstickets/common";
import { Message } from "node-nats-streaming";

import { TicketCreateEvent, Subjects } from "@arstickets/common";
import { Ticket } from "../../models/ticket";
export default class TicketCreatedListener extends Listener<TicketCreateEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = "ticket:queue:group:name";
  async onMessage(data: TicketCreateEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
