import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    viewStatus: { type: Boolean, default: false },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Notification = model('Notification', NotificationSchema);
