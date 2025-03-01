import { Schema, model } from 'mongoose';

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed'],
      default: 'pending',
    },
    dueDate: { type: Date },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    listId: { type: Schema.Types.ObjectId, ref: 'List' },
  },
  { timestamps: true }
);

todoSchema.index({
  title: 'text',
  description: 'text',
});

export const Todo = model('Todo', todoSchema);
