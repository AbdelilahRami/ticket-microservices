import { Publisher, ExpirationComplete, Subjects} from '@arstickets/common';

export class ExpirationCompletedPublisher extends Publisher<ExpirationComplete>{
    subject: Subjects.ExpirationCompleted= Subjects.ExpirationCompleted;

}