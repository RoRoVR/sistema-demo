import { useState } from 'react';

export const useForm = ( initialState = {} ) => {

  const [valuesObj, setValuesObj] = useState(initialState);

  const reset = () => {
    setValuesObj( initialState );
  }

  const handleInputChangeObj = ({ target }) => {
      setValuesObj({
          ...valuesObj,
          [ target.name ]: target.value
      });
  }

  const valueManual = (obj) => {
    setValuesObj({ ...valuesObj, ...obj });
  }

  return [ valuesObj, handleInputChangeObj, valueManual, reset ];
};
