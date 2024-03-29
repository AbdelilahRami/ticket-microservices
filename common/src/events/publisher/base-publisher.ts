import { Stan } from 'node-nats-streaming';
import { Subjects } from '../Subjects';

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  client: Stan;
  abstract subject: T['subject'];
  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        console.log('subject ', this.subject);
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }
}
