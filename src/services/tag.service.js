import { Tag } from '../models/tag.model.js';

export const CreateTag = async (data) => {
  const tag = await Tag.create(data);
  return tag;
};

export const FindAllTags = async (id) => {
  const tag = await Tag.find(id);
  return tag;
};

export const FindTag = async (id) => {
  const tag = await Tag.findById(id);
  return tag;
};

export const FindTagAndUpdate = async (id, data) => {
  const tag = await Tag.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return tag;
};
export const FindTagAndDelete = async (id) => {
  const tag = await Tag.findByIdAndDelete(id);
  return tag;
};
