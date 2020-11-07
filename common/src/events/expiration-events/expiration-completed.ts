import { Subjects } from '../Subjects';

interface ExpirationComplete {
  subject: Subjects.ExpirationCompleted;
  data: {
    orderId: string;
  };
}
