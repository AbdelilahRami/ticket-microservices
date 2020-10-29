import { Listener,  TicketCreateEvent, Subjects  } from "@arstickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export default class TicketCreatedListener extends Listener<TicketCreateEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "order:service";
  async onMessage(data: TicketCreateEvent['data'], msg: Message) {
    const { id, title, price } = data;
    console.log("toto ");
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();
    msg.ack();
  }
}
