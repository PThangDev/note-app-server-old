import mongoose from 'mongoose';
import { ITopic } from '../types';

const topicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model<ITopic>('topics', topicSchema);
