import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    refreshToken: { typr: String },
  },
  { timestamps: true }
);


userSchema.pre('save', async (next) => {
  if (!this.isModified) {
    return next();
  }
  this.password = await hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async (password) => {
  return await compare(password, this.password);
};

export const User = model('User', userSchema);
