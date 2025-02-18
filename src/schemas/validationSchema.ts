import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email('유효한 이메일을 입력하세요.').required('이메일을 입력하세요.'),

  phone: yup
    .string()
    .matches(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      '유효한 전화번호를 입력하세요. (예: 010-1234-5678)'
    )
    .required('전화번호를 입력하세요.'),
});
