import * as yup from 'yup';

/**
 * 개별 필드 유효성 검사 함수
 * @param schema yup 스키마
 * @param field 검사할 필드명
 * @param value 검사할 값
 * @returns 유효성 검사 메시지 (에러가 없으면 빈 문자열 반환)
 */
const validateField = async (
  schema: yup.ObjectSchema<any>,
  field: string,
  value: any
): Promise<string> => {
  try {
    await schema.validateAt(field, { [field]: value });
    return ''; // 유효한 경우 빈 문자열 반환
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return err.message;
    }
    return '유효성 검사 중 오류 발생';
  }
};

/**
 * 개별 필드 유효성 검사 함수 boolean 타입
 * @param schema yup 스키마
 * @param field 검사할 필드명
 * @param value 검사할 값
 * @returns boolean 유효성 검사 결과 (true/false)
 */
const validateFieldBoolean = async (
    schema: yup.ObjectSchema<any>,
    field: string,
    value: any
  ): Promise<boolean> => {
    try {
      await schema.validateAt(field, { [field]: value });
      return true; // 유효한 경우 true 반환
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return false; // 에러 발생 시 false 반환
      }
      return false; // 유효성 검사 중 오류 발생 시 false 반환
    }
  };

const validationSchemaUtil = yup.object().shape({
  email: yup.string().email('유효한 이메일을 입력하세요.').required('이메일을 입력하세요.'),

  phone: yup
    .string()
    .matches(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      '유효한 전화번호를 입력하세요. (예: 010-1234-5678)'
    )
    .required('전화번호를 입력하세요.'),
});

export {
    validateField,
    validationSchemaUtil,
    validateFieldBoolean
}