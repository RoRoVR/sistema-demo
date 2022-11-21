import { upperCamelCase } from "../../../helpers/textConfig";
import { useSelector } from "react-redux";


export const Header = ( {buscar, marca, categoria, handleChange} ) => {

  const { marcas, categorias } = useSelector( s => s.productos );
  const { cargandoAplicacion, items } = useSelector( s => s.ventas );

  return (
    <div className='aplication-header' >

      <div className="container-fluid">
        <div className="row">

          <div className='input-search col-4 me-auto' >
            <input 
            type="search" 
            placeholder='Buscar...'
            id='buscar'
            name='buscar'
            onChange={ handleChange }
            value={ buscar }
            autoComplete='off'             
            />
            <i className="bi bi-search"></i>
          </div>
          {(cargandoAplicacion && items.length !== 0 )&&
            <div className="col-2 me-auto">
              <div className="spinner-border spinner-border-sm text-secondary" role="status">
                <span className="visually-hidden">...</span>
              </div>
              <span className="text-muted ms-2" >Actualizando...</span>
            </div>
          }
          
          <div className="col-2">
            <select 
            className="form-select form-select-sm"
            id='marca'
            name='marca'
            onChange={ handleChange }
            value={ marca }           
            >
              <option value=''>Todas las marcas</option>
              {
                marcas.map( m => (
                  <option key={m.id} value={m.nombre}>{ upperCamelCase( m.nombre )}</option>
                ) )
              }

            </select>         
          </div>
          <div className="col-2">
            <select 
            className="form-select form-select-sm"
            id='categoria'
            name='categoria'
            onChange={ handleChange }
            value={ categoria }  
            >
              <option value=''>Todas las categorias</option>
              {
                categorias.map( c => (
                  <option key={c.id} value={c.nombre}>{ upperCamelCase( c.nombre )}</option>
                ) )
              }
            </select>         
          </div>

        </div>
      </div>
    </div>
  )
}
