import mongoose from 'mongoose';
import { INote } from '../types';

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'topics' }],
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      trim: true,
    },
    thumbnail: { type: String, trim: true },
    background: { type: String, trim: true, default: '' },
    slug: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['default', 'pin', 'trash'],
      default: 'default',
    },
  },
  { timestamps: true }
);

export default mongoose.model<INote>('notes', noteSchema);
