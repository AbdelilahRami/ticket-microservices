import { Subjects } from './Subjects';
import { TicketCreateEvent } from './ticket-create-event';
import { Message } from 'node-nats-streaming';
import {Listener} from './base-listener';


export class TicktCreatedListener extends Listener<TicketCreateEvent> {
    subject : Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
    onMessage(data: TicketCreateEvent['data'], msg: Message): void {
        console.log('Event data ', data);
        msg.ack();
    }

    
}