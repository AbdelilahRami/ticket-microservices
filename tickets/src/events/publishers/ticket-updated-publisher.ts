import {Subjects, Publisher, TicketUpdateEvent} from '@arstickets/common';

export class TicketUpdatePublisher extends Publisher<TicketUpdateEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}