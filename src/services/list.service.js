import { List } from '../models/List.model.js';

export const CreateList = async (data) => {
  const list = await List.create(data);
  return list;
};

export const FindAllLists = async (id) => {
  const list = await List.find(id);
  return list;
};

export const FindList = async (id) => {
  const list = await List.findById(id);
  return list;
};

export const FindListAndUpdate = async (id, data) => {
  const list = await List.findByIdAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return list;
};
export const FindListAndDelete = async (id) => {
  const list = await List.findByIdAndDelete(id);
  return list;
};
