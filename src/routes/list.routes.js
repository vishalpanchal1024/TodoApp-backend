import { Router } from 'express';
import { Authentication } from '../middleware/auth.middleware.js';
import { AddListValidator } from '../helper/helper.js';
import {
  AddList,
  AllLists,
  DeleteList,
  SingleList,
  UpdateList,
} from '../controller/list.controller.js';

const listRoute = Router();

listRoute.route('/create-list').post(AddListValidator, Authentication, AddList);
listRoute.route('/all-list').get(Authentication, AllLists);
listRoute.route('/single-list/:id').get(Authentication, SingleList);
listRoute
  .route('/update-list/:id')
  .patch(AddListValidator, Authentication, UpdateList);
listRoute.route('/delete-list/:id').delete(Authentication, DeleteList);

export default listRoute;
