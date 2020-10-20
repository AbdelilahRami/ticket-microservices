import {Subjects, Publisher, TicketCreateEvent} from '@arstickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}