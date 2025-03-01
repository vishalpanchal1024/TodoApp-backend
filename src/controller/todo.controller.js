import { StatusCodes } from 'http-status-codes';
import { AsyncHandler } from '../utils/asyncHandler.js';
import {
  CreateTodo,
  FindAllTodo,
  FindTodo,
  FindTodoAndUpdate,
} from '../services/todo.service.js';
import { BadRequestError, NotFoundError } from '../utils/errorHandler.js';

const AddTodos = AsyncHandler(async (req, res) => {
  const data = req.body;

  const todo = await CreateTodo({ ...data, userId: req.user?._id });

  if (!todo) {
    throw BadRequestError('Invalid Todo Data ', 'AddTodos');
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: 'Todo Created Successfully.' });
});

const AllTodos = AsyncHandler(async (req, res) => {
  const data = await FindAllTodo({ userId: req.user._id });

  if (!data) {
    throw NotFoundError('Todo Not Found .', 'AllTodos');
  }

  return res
    .status(StatusCodes.OK)
    .json({ data, message: 'Fetch All Todos Successfully.' });
});

const Todo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await FindTodo(id);
  if (!todo) {
    throw NotFoundError('Data Not Found .', 'Todo method');
  }

  return res
    .status(StatusCodes.OK)
    .json({ todo, message: 'Todo Fetch Successfully .' });
});

const UpdateTodo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await FindTodoAndUpdate(id);
  if (!todo) {
    throw NotFoundError('Data Not Found .', 'Todo method');
  }

  return res
    .status(StatusCodes.OK)
    .json({ todo, message: ' Update Todo Successfully .' });
});

const DeleteTodo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const todo = await FindTodoAndDelete(id);
  if (!todo) {
    throw NotFoundError('Data Not Found .', 'Todo method');
  }

  return res
    .status(StatusCodes.OK)
    .json({ todo, message: 'Todo Fetch Successfully .' });
});

const ChangeTodoStatus = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const status = req.body;

  if (!status) {
    throw BadRequestError('Status is Required .', 'ChangeTodoStatus method');
  }

  const todo = await FindTodoAndUpdate(id, { status });

  if (!todo) {
    throw NotFoundError('Data Not Found .', 'ChangeTodoStatus Method');
  }
});

export { AddTodos, AllTodos, Todo, DeleteTodo, UpdateTodo, ChangeTodoStatus };
