import * as yup from 'yup';

const validate = (field, links) => {
  const schema = yup.string()
    .url('wrongLink')
    .test('is-unique', 'doubleAdd', (value) => {
      if (!links.includes(value)) {
        return true;
      } return false;
    });

  return schema.validate(field, { abortEarly: false })
    .then(() => {
      return field;
    })
    .catch((errors) => {
      throw errors;
    });
};

export default validate;
