import { useState } from 'react';

// name= {`nombre_${index}`}
// onChange={handleInputChange}
// value={obj.nombre}

export const useFormList = ( initialState = [] ) => {
  const [formValues, setFormValues] = useState(initialState);

  const reset = () => {
    setFormValues( initialState );
  }

  const listAdd = (obj={}) => {
    setFormValues( values => ([...values, obj]) );
  }

  const listDelete = (index, id = false) => {
    if(id){
      let newValues = formValues.filter(obj => obj.id !== id);
      setFormValues(newValues);    
    }else{
      let newValues = [...formValues];
      newValues.splice(index, 1);
      setFormValues(newValues);
    }
  }

  const handleInputChangeManual = ( campo, index, value ) => {
    setFormValues( values => {
      let newValues = [...values];
      newValues[index] = { ...newValues[index], [campo]: value };
      return newValues
    } );    
  }

  const handleInputChange = ({ target }) => {
    // name = target.name_index
    const arr = target.name.split('_');
    const campo = arr[0];
    const index = parseInt(arr[1]);

    // Verificamos si el VALUE es String o Number. Si es numero se convierte a entero, caso contrario se deja el valor por defecto
    // Nota: No detecta los FLOATS
    // const value = ((isNaN(target.value) || target.value === '' || target.value.includes(' ') ) ? target.value : parseInt(target.value));

    const value = target.value;

    setFormValues( values => {
      let newValues = [...values];
      newValues[index] = { ...newValues[index], [campo]: value };
      return newValues
    } );
  }

  return  [ formValues, handleInputChange,listAdd,listDelete, reset, handleInputChangeManual ] ;
};
