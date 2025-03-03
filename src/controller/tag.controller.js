import { StatusCodes } from 'http-status-codes';
import { AsyncHandler } from '../utils/asyncHandler.js';
import { BadRequestError, NotFoundError } from '../utils/errorHandler.js';
import {
  FindTagAndUpdate,
  CreateTag,
  FindAllTags,
  FindTag,
  FindTagAndDelete,
} from '../services/tag.service.js';

const AddTag = AsyncHandler(async (req, res) => {
  const data = req.body;

  const tag = await CreateTag({ ...data, userId: req.user?._id });

  if (!tag) {
    throw BadRequestError('Invalid Data .', 'AddTag method');
  }

  return res
    .status(StatusCodes.OK)
    .json({ message: 'Tag Created Successfully .' });
});

const AllTags = AsyncHandler(async (req, res) => {
  const data = await FindAllTags({ userId: req.user?._id });

  if (!data) {
    throw NotFoundError('Data Not Found .', 'ALLTag method');
  }

  return res
    .status(StatusCodes.OK)
    .json({ data, message: ' All Tag Fetch Successfully .' });
});

const SingleTag = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw BadRequestError('Invalid Request .', 'Single Method');
  }

  const data = await FindTag(id);
  if (!data) {
    throw NotFoundError('Data Not found .', 'Single Method');
  }

  res.status(StatusCodes.OK).json({ data, message: 'Fetch Succcessfully' });
});

const UpdateTag = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!id) {
    throw BadRequestError('Invalid Request .', 'Single Method');
  }

  const tag = await FindTagAndUpdate(id, data);
  if (!tag) {
    throw NotFoundError('Data Not found .', 'Single Method');
  }

  res.status(StatusCodes.OK).json({ message: 'Data Update Succcessfully .' });
});

const DeleteTag = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw BadRequestError('Invalid Request .', 'Single Method');
  }

  const data = await FindTagAndDelete(id);
  if (!data) {
    throw NotFoundError('Data Not found .', 'Single Method');
  }

  res.status(StatusCodes.OK).json({ message: 'Tag Delete Succcessfully' });
});

export { AddTag, AllTags, SingleTag, UpdateTag, DeleteTag };
