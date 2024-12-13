import * as Yup from 'yup'

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.-]+@(gmail\.com|mail\.ru|inbox\.ru|bk\.ru|list\.ru|internet\.ru|xmail\.ru|yandex\.ru|yahoo\.com|hotmail\.com|outlook\.com)$/,
      'Invalid email address',
    )
    .required('Required'),
  password: Yup.string().required('Required'),
  nickname: Yup.string()
    .matches(/^[a-zA-Z0-9.,\-: ]+$/, 'Nickname can only contain letters, numbers, dots, commas, hyphens, and colons.')
    .max(15, 'Nickname cannot exceed 15 characters')
    .required('Required'),
})
