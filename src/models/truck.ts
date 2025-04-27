import mongoose, { Schema, Document } from 'mongoose';

export interface ITruck extends Document {
    user: mongoose.Types.ObjectId;
    year: string;
    color: string;
    plates: string;
}

const TruckSchema: Schema = new Schema<ITruck>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    plates: {
        type: String,
        required: true
    }
});     

const Truck = mongoose.model<ITruck>('Truck', TruckSchema);

export default Truck;
