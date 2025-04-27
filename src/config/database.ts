import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Conectado en ${conn.connection.host}`);
    }   catch (err) {
        console.error('Error connecting to MongoDB: ', err);
        process.exit(1);
    }
};

export default connectDB;