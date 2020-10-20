import { Subjects } from '../Subjects';
interface TicketUpdateEvent{
    subject : Subjects.TicketUpdated;
    data : {
        id: string,
        title : string,
        price: number,
        userId: string
    }
    
}