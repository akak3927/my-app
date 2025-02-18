import React, { useState } from 'react';
import * as yup from 'yup';

const useValidation = (schema: yup.ObjectSchema<any>) => {
    const [values, setValues] = useState<{ [key: string]: any }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
    const validateField = async (field: string, value: any) => {
      try {
        await schema.validateAt(field, { [field]: value });
        setErrors((prev) => ({ ...prev, [field]: '' })); // 유효하면 에러 제거
      } catch (err) {
        if (err instanceof yup.ValidationError) {
          setErrors((prev) => ({ ...prev, [field]: (err as yup.ValidationError).message }));
        }
      }
    };
  
    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
  
      // 입력할 때마다 실시간 검사 실행
      await validateField(name, value);
    };
  
    // ✅ 반드시 객체를 반환해야 함
    return { values, errors, handleChange };
  };

  export default useValidation;
