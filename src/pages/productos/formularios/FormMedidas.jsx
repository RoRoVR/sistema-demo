import React from 'react'

export const FormMedidas = ({ handleSubmit, handleChange, nombre, errorNombre }) => {
  return (
    <div>
      <div className="row"> 
        <div className='mb-2' >
          <label htmlFor="nombre"> Nombre: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Ej: MTS'
            autoComplete='off'
            id='nombre'
            name='nombre'
            onChange={ handleChange }
            value={ nombre }
            required
          />
          { errorNombre&& <span className='text-danger' > La medida debe tener un máximo de 3 caracteres. </span>}
        </div>
      </div>       
    </div>
  )
}
