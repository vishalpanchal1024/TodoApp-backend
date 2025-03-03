import { Router } from 'express';
import { AddTagValidator } from '../helper/helper.js';
import { Authentication } from '../middleware/auth.middleware.js';
import {
  AddTag,
  AllTags,
  DeleteTag,
  SingleTag,
  UpdateTag,
} from '../controller/tag.controller.js';

const tagRoute = Router();

tagRoute.route('/create-tag').post(Authentication, AddTagValidator, AddTag);
tagRoute.route('/all-tags').get(Authentication, AllTags);
tagRoute.route('/single-tag/:id').get(Authentication, SingleTag);
tagRoute
  .route('/update-tag/:id')
  .patch(AddTagValidator, Authentication, UpdateTag);
tagRoute.route('/delete-tag/:id').delete(Authentication, DeleteTag);

export default tagRoute;
