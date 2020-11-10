import { Message } from 'node-nats-streaming';
import {
  Listener,
  ExpirationComplete,
  Subjects,
  OrderStatus,
} from '@arstickets/common';
import { Order } from '../../models/order';
import orderCancelledPublisher from '../publisher/order-cancelled-publisher';

export class ExpirationCompletedListener extends Listener<ExpirationComplete> {
  subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted;
  queueGroupName: string = 'expiration:service';

  async onMessage(data: ExpirationComplete['data'], message: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    await new orderCancelledPublisher(this.client).publish({
      id: order.id,
      userId: order.userId,
      ticket: {
        id: order.ticket.id,
        title: order.ticket.title,
        price: order.ticket.price,
      },
      version: order.version,
      expiresAt: order.expiresAt.toISOString(),
    });
    message.ack();
  }
}
