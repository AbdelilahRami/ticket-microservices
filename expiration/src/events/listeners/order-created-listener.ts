import { expirationQueue } from './../queues/expiration-queue';
import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@arstickets/common';

export class OrderCreatedListenr extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = 'ordre:created';

  async onMessage(data: OrderCreatedEvent['data'], message: Message) {
    const expirationTime =
      new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay: expirationTime,
      }
    );
    message.ack();
  }
}
