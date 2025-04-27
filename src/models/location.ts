import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
    user: mongoose.Types.ObjectId;
    address: string;
    place_id: string;
    latitude: number;
    longitude: number;     
}

const LocationSchema: Schema = new Schema<ILocation>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    place_id: {
        type: String,
        required: true,
        unique: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

const Location = mongoose.model<ILocation>('Location', LocationSchema);

export default Location;
