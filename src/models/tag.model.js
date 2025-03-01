import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    color: { type: String, default: '#000000' },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Tag = model('Tag', tagSchema);
