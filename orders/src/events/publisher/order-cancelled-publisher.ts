import { OrderCancelledEvent, Publisher, Subjects } from "@arstickets/common";
import orderCancelledPublisher from "./order-created-publisher";

class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

export default orderCancelledPublisher;