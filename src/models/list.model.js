import { Schema, model } from 'mongoose';

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true }
);

export const List = model('Tag', listSchema);
