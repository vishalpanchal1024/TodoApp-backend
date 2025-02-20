import { User } from '../models/user.model.js';

export const findByEmailOrUsername = async (email, username) => {
  const data = await User.findOne({ $or: [{ email: email }, { username: username }] }).exec();
  console.log(data);
  return data;
};

export const findById = async (id) => {
  const user = await User.findById(id).select('-password').exec();
  return user;
};

export const CreateUser = async (data) => {
  const user = await User.create(data);
  return user;
};

// export const UpdateProfile = async (id, profilePic) => {
//   const user = await User.findByIdAndUpdate(id, { profilePic }, { new: true }).exec();
//   return user;
// };

// export const UpdateRefreshToken = async (id, refresh_token) => {
//   const data = await User.findByIdAndUpdate(id, { refresh_token }, { new: true }).exec();
//   return data;
// };

// export const getUsers = async (id) => {
//   const data = await User.find({ _id: { $ne: id } }).select('-password').exec();
//   return data;
// };