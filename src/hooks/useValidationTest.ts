import { useState } from 'react';
import { validateField } from '../utils/validationUtils';
import { validateFieldBoolean } from '../utils/validationUtils';
import * as yup from 'yup';

const useValidationTest = (schema: yup.ObjectSchema<any>) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // ✅ 유틸 함수 사용
    const errorMessage = await validateField(schema, name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  return { values, errors, handleChange };
};

const useValidationTestBoolean = (schema: yup.ObjectSchema<any>) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(true); // 유효성 검사 전체 상태

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // ✅ 유틸 함수 사용
    const isValidField = await validateFieldBoolean(schema, name, value);
    setIsValid(isValidField); // 필드 유효성 검사 결과 반영

    // 필드 유효성 검사 메시지 설정
    const errorMessage = isValidField ? '' : '유효하지 않은 값입니다.';
    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  return { values, errors, isValid, handleChange };
};

export {
    useValidationTest,
    useValidationTestBoolean 
};
