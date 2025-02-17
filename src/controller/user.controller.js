import { AsyncHandler } from '../utils/asyncHandler';
import { BadRequestError } from '../utils/errorHandler';

const registerUser = AsyncHandler(async (req, res, next) => {
  const { fullName, userName, email, password } = req.body;
  if (
    [fullName, userName, email, password].some((field) => field?.trim() === '')
  ) {
    throw new BadRequestError('All Fields are Required .', ' registerUser');
  }


  
});

export default { registerUser };
