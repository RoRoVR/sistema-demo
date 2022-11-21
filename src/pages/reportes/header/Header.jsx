import { useDispatch } from 'react-redux';
import { obtenerColeccionReportesPorFecha } from '../slices/reportesThunk';

export const Header = ({ valuesObj, handleInputChangeObj }) => {
  const dispatch = useDispatch();

  const filtrar = () => {
    const dateInicio = valuesObj.fechaInicio;
    const dateFinal = valuesObj.fechaFinal;
    dispatch( obtenerColeccionReportesPorFecha(dateInicio, dateFinal) );

  }

  return (
    <div className='aplication-header' >
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="col-5 me-auto">
                <select 
                className='form-select form-select-sm' 
                name="filtro" 
                id="filtro"
                onChange={handleInputChangeObj}
                value={valuesObj.filtro}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="compras">Compras</option>
                  <option value="ventas">Ventas</option>
                  <option value="gastos">Gastos</option>

                </select>
              </div>
            </div>
            <div className="col-8 d-flex justify-content-end">
              <label className='fw-bold text-end pe-2' htmlFor="fechaInicio"> Fecha inicial: </label>
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
              <label className='fw-bold text-end pe-2 ' htmlFor="fechaFinal"> Fecha final: </label>
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
                <div className="btn btn-primary" onClick={filtrar} > Buscar </div>
              </div>
            </div>


          </div>
        </div>
    </div>
  )
}
