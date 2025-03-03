import { StatusCodes } from 'http-status-codes';
import { AsyncHandler } from '../utils/asyncHandler.js';
import { BadRequestError, NotFoundError } from '../utils/errorHandler.js';
import {
  FindListAndUpdate,
  CreateList,
  FindAllLists,
  FindList,
  FindListAndDelete,
} from '../services/list.service.js';

const AddList = AsyncHandler(async (req, res) => {
  const data = req.body;

  const list = await CreateList({ ...data, userId: req.user?._id });

  if (!list) {
	throw BadRequestError('Invalid Data .', 'AddList method');
  }

  return res
	.status(StatusCodes.OK)
	.json({ message: 'List Created Successfully .' });
});

const AllLists = AsyncHandler(async (req, res) => {
  const data = await FindAllLists({ userId: req.user?._id });

  if (!data) {
	throw NotFoundError('Data Not Found .', 'ALLList method');
  }

  return res
	.status(StatusCodes.OK)
	.json({ data, message: ' All List Fetch Successfully .' });
});

const SingleList = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
	throw BadRequestError('Invalid Request .', 'Single Method');
  }

  const data = await FindList(id);
  if (!data) {
	throw NotFoundError('Data Not found .', 'Single Method');
  }

  res.status(StatusCodes.OK).json({ data, message: 'Fetch Succcessfully' });
});

const UpdateList = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
	throw BadRequestError('Invalid Request .', 'Single Method');
  }

  const List = await FindListAndUpdate(id, data);
  if (!List) {
	throw NotFoundError('Data Not found .', 'Single Method');
  }

  res.status(StatusCodes.OK).json({ message: 'Data Update Succcessfully .' });
});

const DeleteList = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
	throw BadRequestError('Invalid Request .', 'Single Method');
  }

  const data = await FindListAndDelete(id);
  if (!data) {
	throw NotFoundError('Data Not found .', 'Single Method');
  }

  res.status(StatusCodes.OK).json({ message: 'List Delete Succcessfully' });
});

export { AddList, AllLists, SingleList, UpdateList, DeleteList };
