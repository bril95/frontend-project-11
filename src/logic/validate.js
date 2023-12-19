import * as yup from 'yup';

const validate = (field, links) => {
  const schema = yup.string()
    .url('Ссылка должна быть валидным URL')
    .test('is-unique', 'RSS уже существует', (value) => {
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
