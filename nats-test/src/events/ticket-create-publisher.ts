import { TicketCreateEvent } from './ticket-create-event';
import { Publisher } from "./base-publisher";
import { Subjects } from './Subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    

}