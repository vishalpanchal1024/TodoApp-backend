import { Router } from 'express';
import { Authentication } from '../middleware/auth.middleware.js';
import { CreateTodoValidator } from '../helper/helper.js';
import {
  AddTodos,
  AllTodos,
  Todo,
  DeleteTodo,
  UpdateTodo,
  ChangeTodoStatus,
} from '../controller/todo.controller.js';

const todoRoute = Router();

todoRoute
  .route('/create-todo')
  .post(CreateTodoValidator, Authentication, AddTodos);
todoRoute.route('/all-todos').get(Authentication, AllTodos);
todoRoute.route('/todo/:id').get(Authentication, Todo);
todoRoute.route('/delete-todo/:id').delete(Authentication, DeleteTodo);
todoRoute
  .route('/update-todo/:id')
  .patch(CreateTodoValidator, Authentication, UpdateTodo);
todoRoute
  .route('/change-todo-status/:id')
  .patch(Authentication, ChangeTodoStatus);

export default todoRoute;
