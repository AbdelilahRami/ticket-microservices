import { Listener, Subjects, TicketUpdateEvent } from "@arstickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export default class TicketUpdatedListener extends Listener<TicketUpdateEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = "order:service";
  async onMessage(data: TicketUpdateEvent["data"], msg: Message) {
    const { id, version, title, price } = data;

    const ticket = await Ticket.findOne({ _id: id, version: version - 1 });

    if (!ticket) {
      throw new Error("Ticket Not Found ");
    }
    ticket.set({ price, title });
    await ticket.save();
    msg.ack();
    console.log(
      "Updated ticket in order service with version ",
      version,
      "price",
      price,
      "title",
      title
    );
  }
}