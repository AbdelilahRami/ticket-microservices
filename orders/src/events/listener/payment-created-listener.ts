import { OrderStatus } from './../../../../common/src/shared/types/order-status';
import { Message } from 'node-nats-streaming';
import { Listener, PaymentCreatedEvent, Subjects } from '@arstickets/common';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName: string = 'payment:created';

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({
      status: OrderStatus.Complete,
    });
    order.save();

    msg.ack();
  }
}
