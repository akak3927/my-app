import React from 'react';
import useValidation from '../hooks/useValidation';
import { validationSchema } from '../schemas/validationSchema';
import { useValidationTest, useValidationTestSync, useValidationTestSyncType } from '../hooks/useValidationTest';
import { validationSchemaUtil } from '../utils/validationUtils';

//0208
const MyComponent : React.FC = () => {

  const { values, errors, handleChange } = useValidationTestSyncType(validationSchemaUtil);

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

      <div>
        <input type="date" name="date" value={values.date || ''} onChange={handleChange} placeholder='날짜'/>
        {errors.date && <p>{errors.date}</p>}
      </div>

      <div>
        <input
          type="date"
          name="startDate"
          value={values.startDate || ''}
          onChange={handleChange}
        />
        {errors.startDate && <p>{errors.startDate}</p>}
      </div>

      <div>
        <input
          type="date"
          name="endDate"
          value={values.endDate || ''}
          onChange={handleChange}
        />
        {errors.endDate && <p>{errors.endDate}</p>}
      </div>
    </div>
  );
};

export default MyComponent;
