import React from 'react'

export const FormMarcas = ({ handleSubmit, handleChange, nombre, procedencia, errorNombre }) => {
  return (
    <div>
      <div className="row"> 
        <div className='mb-2' >
          <label htmlFor="nombre"> Nombre: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Ej: Tramontina'
            autoComplete='off'
            id='nombre'
            name='nombre'
            onChange={ handleChange }
            value={ nombre }
            required
          />
          { errorNombre&& <span className='text-danger' >El nombre debe tener un máximo de 10 caracteres.</span>}
        </div>

        <div className='mb-2' >
          <label htmlFor="procedencia"> Procedencia: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Ej: Brasil'
            autoComplete='off'
            id='procedencia'
            name='procedencia'
            onChange={ handleChange }
            value={ procedencia }
          />
        </div>

      </div>       

    </div>
  )
}
