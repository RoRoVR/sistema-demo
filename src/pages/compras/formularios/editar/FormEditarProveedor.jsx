
export const FormEditarProveedor = ( { handleSubmit, handleChange, nombre, encargado, nit, ciudad, direccion, contacto } ) => {

  return (
    <form onSubmit={ handleSubmit } >
      <div className="row"> 
        <div className='mb-2 col-12' >
          <label htmlFor="nombre"> Nombre: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Sigme-Electri'
            autoComplete='off'
            id='nombre'
            name='nombre'
            onChange={ handleChange }
            value={  nombre }
          />
        </div>

        <div className='mb-2 col-12' >
          <label htmlFor="encargado"> Encargado: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Hernesto Campos'
            autoComplete='off'
            id='encargado'
            name='encargado'
            onChange={ handleChange }
            value={ encargado }
          />
        </div>

        <div className='mb-2 col-12' >
          <label htmlFor="nit"> NIT: </label>
          <input 
            type="number" 
            className='form-control py-1'
            placeholder='10625648013'
            autoComplete='off'
            id='nit'
            name='nit'
            onChange={ handleChange }
            value={ nit }
          />
        </div>

        <div className='mb-2 col-12' >
          <label htmlFor="ciudad"> Ciudad: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Cochabamba'
            autoComplete='off'
            id='ciudad'
            name='ciudad'
            onChange={ handleChange }
            value={ ciudad }
          />
        </div>

        <div className='mb-2 col-12' >
          <label htmlFor="direccion"> Direccion: </label>
          <input 
            type="text" 
            className='form-control py-1'
            placeholder='Calle Campero Nº 125'
            autoComplete='off'
            id='direccion'
            name='direccion'
            onChange={ handleChange }
            value={ direccion }
          />
        </div>

        <div className='mb-2 col-12' >
          <label htmlFor="contacto"> Contacto: </label>
          <input 
            type="number" 
            className='form-control py-1'
            placeholder='78223755'
            autoComplete='off'
            id='contacto'
            name='contacto'
            onChange={ handleChange }
            value={ contacto }
          />
        </div>
      </div>       
    </form>
  )
}
