import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    truck: mongoose.Types.ObjectId;
    status: 'created' | 'in transit' | 'completed';
    pickup: mongoose.Types.ObjectId;
    dropoff: mongoose.Types.ObjectId;
}

const OrderSchema: Schema = new Schema<IOrder>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck',
        required: true
    },
    status: {
        type: String,
        enum: ['created', 'in transit', 'completed'],
        default: 'created'
    },
    pickup: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    dropoff: {           
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
