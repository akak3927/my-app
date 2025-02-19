import { useState } from 'react';
import { validateField } from '../utils/validationUtils';
import { validateFieldBoolean, validateFieldSync } from '../utils/validationUtils';
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

const useValidationTestSync = (schema: yup.ObjectSchema<any>) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(true); // 전체 유효성 상태

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // ✅ 동기 방식으로 개별 필드 유효성 검사
    const errorMessage = validateFieldSync(schema, name, value);

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));

    // 🔥 전체 유효성 검사: 모든 필드가 유효한지 확인
    setIsValid(Object.values(errors).every((msg) => msg === '') && errorMessage === '');
  };

  return { values, errors, isValid, handleChange };
};

const useValidationTestSyncType = (schema: yup.ObjectSchema<any>) => {
  const [values, setValues] = useState<{ [key: string]: any }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // 동기 방식으로 개별 필드 유효성 검사
    const errorMessage = validateFieldSync(schema, name, value);

    // 필드별 오류 메시지 상태 업데이트 후, 전체 유효성 상태 갱신
    setErrors((prev) => {
      const updatedErrors = { ...prev, [name]: errorMessage };

      // 전체 유효성 상태 갱신
      setIsValid(Object.values(updatedErrors).every((msg) => msg === ''));

      return updatedErrors;
    });
  };

  return { values, errors, isValid, handleChange };
};

export {
    useValidationTest,
    useValidationTestBoolean,
    useValidationTestSync,
    useValidationTestSyncType
};
