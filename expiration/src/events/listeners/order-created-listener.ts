import { expirationQueue } from './../queues/expiration-queue';
import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@arstickets/common';
export class OrderCreatedListenr extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = 'ordre:created';

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    console.log('expiration');
    await expirationQueue.add({
      orderId: data.id,
    });
    message.ack();
  }
}
