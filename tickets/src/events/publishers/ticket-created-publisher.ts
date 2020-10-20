import {Subjects, Publisher, TicketCreateEvent} from '@arstickets/common/build/common/src';

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}