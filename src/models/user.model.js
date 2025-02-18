import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    otp: { type: String },
    emailVarification: { type: Boolean, required: true, default: false },
    refreshtoken: { typr: String },
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
