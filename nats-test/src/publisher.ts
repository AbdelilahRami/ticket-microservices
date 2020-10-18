import { TicketCreatedPublisher } from './events/ticket-create-publisher';
import { Subjects } from './events/Subjects';
import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  const ticketCreatePublisher = new TicketCreatedPublisher(stan);
  await ticketCreatePublisher.publish({
      id: 'id',
      title: 'title',
      price: 20
  });
});
