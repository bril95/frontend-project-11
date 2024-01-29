import * as yup from 'yup';
import yupLocale from './locales/yupLocale.js';

yup.setLocale(yupLocale);

const validate = (field, links) => {
  const schema = yup.string()
    .url()
    .notOneOf(links);

  return schema.validate(field, { abortEarly: false })
    .then(() => field)
    .catch((errors) => {
      throw errors;
    });
};

export default validate;
