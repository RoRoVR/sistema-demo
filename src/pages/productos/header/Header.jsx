import { useSelector } from "react-redux";
import { upperCamelCase } from "../../../helpers/textConfig";

export const Header = ({buscar, marca, categoria, estado, handleChange}) => {
  const { marcas, categorias } = useSelector( s => s.productos );

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
          <div className="col-2">
          <select 
          className="form-select form-select-sm"
          id='estado'
          name='estado'
          onChange={ handleChange }
          value={ estado }  
          >
            <option value=''>Todos los estados</option>
            <option value='success'>Cantidad optima</option>
            <option value='warning'>Cantidad media</option>
            <option value='danger'>Pocas unidades</option>
            
          </select>         
        </div>

        </div>
      </div>
    </div>
  )
}
