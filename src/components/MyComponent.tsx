import React from 'react';
import useValidation from '../hooks/useValidation';
import { validationSchema } from '../schemas/validationSchema';
import { useValidationTest } from '../hooks/useValidationTest';
import { validationSchemaUtil } from '../utils/validationUtils';

const MyComponent : React.FC = () => {

  const { values, errors, handleChange } = useValidationTest(validationSchemaUtil);

  return (
    <div>

      <div>
        <input type="email" name="email" value={values.email || ''} onChange={handleChange} placeholder="이메일" />
        {errors.email && <p>{errors.email}</p>}
      </div>

      <div>
        <input type="tel" name="phone" value={values.phone || ''} onChange={handleChange} placeholder="전화번호" />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

    </div>
  );
};

export default MyComponent;
