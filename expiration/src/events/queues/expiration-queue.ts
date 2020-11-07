import { natsWrapper } from '../../nats-wrapper';
import { ExpirationCompletedPublisher } from './../publishers/expiration-completed-publisher';
import Queue, { Job } from 'bull';

interface Payload {
  orderId: string;
}

export const expirationQueue = Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQueue.process(async (job: Job) => {
  new ExpirationCompletedPublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});
