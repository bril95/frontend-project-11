import * as yup from 'yup';
import yupLocale from './locales/yupLocale.js';

yup.setLocale({
  string: yupLocale,
});

const validate = (field, links) => {
  const schema = yup.string()
    .url()
    .notOneOf(links, yupLocale.notOneOf);

  return schema.validate(field, { abortEarly: false })
    .then(() => field)
    .catch((errors) => {
      throw errors;
    });
};

export default validate;
