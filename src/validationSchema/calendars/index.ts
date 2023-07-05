import * as yup from 'yup';

export const calendarValidationSchema = yup.object().shape({
  project_id: yup.string().nullable(),
});
