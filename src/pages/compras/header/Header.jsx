import { useDispatch, useSelector } from 'react-redux';
import { generarFechaAMD } from '../../../helpers/dateConfig';
import { obtenerColeccionComprasPorFecha } from '../slices/comprasThunk';

export const Header = ({ valuesObj, handleInputChangeObj }) => {
  const dispatch = useDispatch();
  const { proveedores } = useSelector(s => s.compras);


  const buscar = () => {
    const dateInicio = valuesObj.fechaInicio;
    const dateFinal = valuesObj.fechaFinal;
    dispatch( obtenerColeccionComprasPorFecha(dateInicio, dateFinal) );
    
    // console.log(valuesObj.fechaInicio + ' / ' + dateInicio.getTime()  );
    // console.log(valuesObj);
    // console.log(valuesObj.fechaFinal);
  }

  return (
    <div className='aplication-header' >
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="col-10 d-flex me-auto">
                <select 
                className='form-select form-select-sm me-3' 
                name="filtro" 
                id="filtro"
                onChange={handleInputChangeObj}
                value={valuesObj.filtro}
                >
                  <option value="">Compras y pedidos</option>
                  <option value="compras">Solo compras</option>
                  <option value="pedidos">Solo pedidos</option>

                </select>
                <select 
                className='form-select form-select-sm text-capitalize' 
                name="proveedor" 
                id="proveedor"
                onChange={handleInputChangeObj}
                value={valuesObj.proveedor}
                >
                  <option value="">Todos los proveedores</option>
                  {proveedores.map(p => (
                    <option key={ p.id } value={p.nombre} className='text-capitalize' >{p.nombre}</option>
                  ))}

                </select>
              </div>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <label className='fw-bold text-end pe-2' htmlFor="fechaInicio"> Desde: </label>
              <div className='me-4' >
                <input 
                    type="date" 
                    className='form-control form-control-sm py-1'
                    autoComplete='off'
                    id='fechaInicio'
                    name='fechaInicio'
                    onChange={handleInputChangeObj}
                    value={valuesObj.fechaInicio}
                />
              </div>
              <label className='fw-bold text-end pe-2 ' htmlFor="fechaFinal"> Hasta: </label>
              <div className='me-4'>
                <input 
                    type="date" 
                    className='form-control form-control-sm py-1'
                    autoComplete='off'
                    id='fechaFinal'
                    name='fechaFinal'
                    onChange={handleInputChangeObj}
                    value={valuesObj.fechaFinal}
                />
              </div>


              <div className=' d-flex justify-content-end' >
                <div className="btn btn-primary" onClick={buscar} > Buscar </div>
              </div>
            </div>


          </div>
        </div>
    </div>
  )
}
