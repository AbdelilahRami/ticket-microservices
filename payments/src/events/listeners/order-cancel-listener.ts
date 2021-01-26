import { OrderStatus } from './../../../../common/src/shared/types/order-status';
import { Message } from 'node-nats-streaming';
import { Listener, OrderCancelledEvent, Subjects } from '@arstickets/common';
import { Order } from '../../models/order';
export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName: string = 'order:cancelled';

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });
    if (!order) {
      throw new Error('Error not found !');
    }

    order.set({ orderStatus: OrderStatus.Cancelled });
    await order.save();
    msg.ack();
  }
}
