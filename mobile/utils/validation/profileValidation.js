import * as yup from 'yup'

const profileValidationSchema = yup.object().shape({
  description: yup.string().max(250, 'Максимум 250 символов.'),
  favoriteBook: yup.string().max(30, 'Максимум 30 символов.'),
  favoriteAuthor: yup.string().max(30, 'Максимум 30 символов.'),
  phoneNumber: yup
    .string()
    .matches(
      /^\+?[1-9][0-9]{9,15}$/,
      'Телефон должен содержать от 10 до 15 цифр и может начинаться со знака "+".'
    ),
  location: yup
    .string()
    .matches(
      /^[а-яА-ЯёЁa-zA-Z0-9.,-]+$/,
      'Адрес может содержать буквы, цифры, точки, запятые и тире.'
    )
    .max(35, 'Максимум 35 символов.'),
  profilePicture: yup
    .mixed()
    .nullable()
    .test(
      'fileFormat',
      'Можно загружать только файлы форматов png, jpg, jpeg, gif.',
      (value) => {
        if (!value) return true
        const extension = value.uri.split('.').pop().toLowerCase()
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'gif']
        return allowedExtensions.includes(extension)
      }
    ),
})

export default profileValidationSchema
