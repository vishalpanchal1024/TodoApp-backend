import { Todo } from '../models/todo.model.js';

export const CreateTodo = async (data) => {
  const todo = await Todo.create(data);
  return todo;
};

export const FindAllTodo = async (id) => {
  const todo = await Todo.find(id);
  return todo;
};

export const FindTodo = async (id) => {
  const todo = await Todo.findById(id);
  return todo;
};

export const FindTodoAndUpdate = async (id, data) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: id },
    { $set: data },
    { new: true }
  );
  return todo;
};
export const FindTodoAndDelete = async (id) => {
  const todo = await User.findByIdAndDelete(id);
  return todo;
};
