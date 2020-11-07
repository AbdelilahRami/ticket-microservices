import { Subjects } from '../Subjects';

export interface ExpirationComplete {
  subject: Subjects.ExpirationCompleted;
  data: {
    orderId: string;
  };
}
