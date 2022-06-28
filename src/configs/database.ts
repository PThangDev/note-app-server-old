import mongoose from 'mongoose';

const connectDB = async () => {
  const URI = process.env.MONGODB_URI as string;
  try {
    await mongoose.connect(URI, {});
    console.log('Connect to MongoDB successfully!');
  } catch (error) {
    console.log('Connect database has error', error);
  }
};

export default connectDB;
