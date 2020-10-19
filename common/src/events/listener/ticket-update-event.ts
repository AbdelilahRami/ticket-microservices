import { Subjects } from './../../../../nats-test/src/events/Subjects';
import { Listener } from "./base-listener";
interface TicketUpdateEvent{
    subject : Subjects.TicketUpdated;
    data : {
        id: string,
        title : string,
        price: number,
        userId: string
    }


}