import { date, object, string } from 'yup';

export const createTodoValidation = object({
  title: string().required('Full Name is Required .'),
  description: string().required('Description  is Required .'),
  status: string().required('Status is Required .'),
  //   dueDate: { type: date },
  //   userId: { type: string },
  //   tags: [{ type: string }],
  //   listId: { type: string },
});
