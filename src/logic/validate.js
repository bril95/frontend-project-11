import * as yup from 'yup';
import ru from '../locales/ru.js';

yup.setLocale({
  string: {
    url: ru.translation.wrongLink,
  },
});

const validate = (field, links) => {
  const schema = yup.string()
    .url()
    .test('isUnique', ru.translation.doubleAdd, (value) => {
      return !links.includes(value);
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
