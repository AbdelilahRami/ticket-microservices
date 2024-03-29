import { Subjects } from '../Subjects';

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
      price: number;
      title: string;
    };
    expiresAt: string;
    version: number;

  };
}
