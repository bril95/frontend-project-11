import * as yup from 'yup';

const validate = (field, links) => {
  const schema = yup.string()
    .url('wrongLink')
    .notOneOf(links, 'doubleAdd');

  return schema.validate(field, { abortEarly: false })
    .then(() => field)
    .catch((errors) => {
      throw errors;
    });
};

export default validate;
