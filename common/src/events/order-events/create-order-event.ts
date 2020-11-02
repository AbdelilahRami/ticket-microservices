import { Subjects } from '../Subjects';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    userId: string;
    version: number;
    ticket: {
      id: string;
      title: string;
      price: number;
    };
    expiresAt: string;
  };
}
