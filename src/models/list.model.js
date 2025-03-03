import { Schema, model } from 'mongoose';

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    color: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }],
  },
  { timestamps: true }
);

export const List = model('List', listSchema);
