import { Schema, model } from 'mongoose';

const tagSchema = new Schema(
  {
    title: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export const Tag = model('Tag', tagSchema);
