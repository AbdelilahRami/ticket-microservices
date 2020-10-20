import {Subjects, Publisher, TicketUpdateEvent} from '@arstickets/common/build/common/src';

export class TicketUpdatePublisher extends Publisher<TicketCreateEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}