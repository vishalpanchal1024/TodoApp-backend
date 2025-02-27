import { Schema, model } from 'mongoose';

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag' },
    listId: { type: Schema.Types.ObjectId, ref: 'List' },
  },
  { timestamps: true }
);

export const Todo = model('Todo', todoSchema);
