import { Message } from 'node-nats-streaming';
import {
  Listener,
  OrderCreatedEvent,
  OrderStatus,
  Subjects,
} from '@arstickets/common';
import { Order } from '../../models/order';
export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = 'payments:service';

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const order = Order.build({
      id: data.id,
      userId: data.userId,
      price: data.ticket.price,
      version: data.version,
      orderStatus: OrderStatus.Created,
    });

    await order.save();

    message.ack();
  }
}
