import { object, string } from 'yup';

export const addListValidation = object({
  title: string().required('tite is Required .'),
  color: string().required('Color is Required .'),
});
