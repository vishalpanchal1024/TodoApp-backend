import { Schema, model } from 'mongoose';

const listSchema = new Schema(
  {
    title: { type: String, required: true },
    color: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
  },
  { timestamps: true }
);

export const List = model('Tag', listSchema);
