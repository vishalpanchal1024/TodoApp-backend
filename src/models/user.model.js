import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';

export const image = new Schema({
  imageUrl: { type: String, required: true },
  imageId: { type: String, required: true },
});

const userSchema = new Schema(
  {
    fullname: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    image: {type:image,required:false},
    role:{type:String,required:true,enum:["admin","user"]},
    email_verification: { type: Boolean, default: false,required:true },
    active_status:{type:Boolean,default:false,required:true},
    admin_verification:{type:Boolean,default:false,required:true},
    refresh_token: { type: String },
    bio:{type:String}
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  this.password = await hash(this.password, 12);
  next();
});

userSchema.methods.isPasswordCorrect = async function(password){
  return await compare(password, this.password);
};

export const User = model('User', userSchema);
