import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import mongoose, { version } from 'mongoose';
import { OrderStatus } from '@arstickets/common';

interface OrderAttributes {
  id: string;
  orderStatus: OrderStatus;
  userId: string;
  price: number;
  version: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  version: number;
  price: number;
  orderStatus: OrderStatus;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attributes: OrderAttributes): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    orderStatus: {
      type: OrderStatus,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    version: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attributes: OrderAttributes) => {
  return new Order({
    _id: attributes.id,
    orderStatus: attributes.orderStatus,
    userId: attributes.userId,
    price: attributes.price,
    version: attributes.version,
  });
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
