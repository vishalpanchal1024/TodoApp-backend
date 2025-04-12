import { User } from '../models/user.model.js';

export const findByEmailOrUsername = async (value) => {
  const data = await User.findOne({
    $or: [{ email: value }, { username: value }],
  });
  return data;
};

export const findById = async (id) => {
  const user = await User.findById(id).select('-password -refreshToken').exec();
  return user;
};

export const CreateUser = async (data) => {
  const user = await User.create(data);
  return user;
};

export const UpdateProfile = async (id, profileData) => {
  const user = await User.findByIdAndUpdate(id, profileData, {
    new: true,
  }).exec();
  return user;
};

export const UpdateRefreshToken = async (id, refreshToken) => {
  const data = await User.findByIdAndUpdate(
    id,
    { refreshToken },
    { new: true }
  ).exec();
  return data;
};

export const getUsers = async (id) => {
  const data = await User.find({ _id: { $ne: id } }).select('-password').exec();
  return data;
};

export const FindByIdAndUpdate = async(id,val) => {
  const data = await User.findByIdAndUpdate(id,val).exec()
  return data
}
