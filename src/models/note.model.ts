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
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    thumbnail: { type: String, trim: true, default: '' },
    background: { type: String, trim: true, default: '' },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    is_trash: { type: Boolean, default: false },
    is_pin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

noteSchema.index({ title: 'text', content: 'text' }, { default_language: 'none' });

export default mongoose.model<INote>('notes', noteSchema);
