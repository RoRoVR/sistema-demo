import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemListCotizaciones } from "../components/ItemListCotizaciones";
import { buscarColeccionListaCotizacionPorNumero, obtenerColeccionListaCotizacionesPorFecha } from "../slices/ventasThunk";
import { NuevaCotizacion } from "./NuevaCotizacion";

export const ListCotizaciones = ({setListCotizaciones}) => {

  const date = new Date();
    const primer = new Date(date.getFullYear(), date.getMonth(), 1);
    const primerDia = primer.toISOString().split('T')[0];
    const ultimo = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDia = ultimo.toISOString().split('T')[0];
    const dispatch = useDispatch();
    const [nuevaCotizacion, setNuevaCotizacion] = useState(false);
    const { registroCotizaciones, actualizandoDatos } = useSelector(s => s.ventas);

    const inputFechaIni = useRef();
    const inputFechaFin = useRef();
    const inputNumero = useRef();

    useEffect(() => {
        dispatch( obtenerColeccionListaCotizacionesPorFecha( primerDia, ultimoDia ) );      
    }, []);
    
    const buscarPorFecha = () => {
        const i = inputFechaIni.current.value;
        const f = inputFechaFin.current.value;
        if( i !== '' || f !== '' ){
            dispatch( obtenerColeccionListaCotizacionesPorFecha( i, f ) ); 
        }
    }

    const buscarPorNumero = () => {
        const num =  parseInt(inputNumero.current.value);
        if( num !== '' ){
            dispatch( buscarColeccionListaCotizacionPorNumero(num) );
        }
    }


  return (
    <div className='window'>
      <div className="window-container">
        {/* VENTANAS */}
        {nuevaCotizacion&&
            <NuevaCotizacion setNuevaCotizacion={ setNuevaCotizacion } />
        }

        <div className="window-head">
            <span>LISTA DE COTIZACIONES</span>
            <div className="btn-exit" onClick={ () => { setListCotizaciones(s => !s) } } >
                <i className="bi bi-x"></i>
            </div>
        </div>

        <div className="container-fluid">
            <div className="row my-3">
                <div className="col-4 d-flex">
                    <div className="col-4 me-auto">
                        <input
                        type='number'
                        placeholder="Número..."
                        className="form-control form-control-sm"
                        ref={inputNumero}
                        />
                    </div>
                    <div className="col ms-2 me-3">
                        <button 
                        type='button' 
                        className={ actualizandoDatos? 'btn btn-primary disabled': 'btn btn-primary' }
                        onClick={ buscarPorNumero }
                        >
                            { actualizandoDatos &&
                            <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            }
                                Buscar
                        </button>
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
                            defaultValue={primerDia}
                            ref={ inputFechaIni }
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
                            defaultValue={ ultimoDia }
                            ref={ inputFechaFin }
                        />
                    </div>


                    <div className=' d-flex justify-content-end' >
                        <button 
                        type='button' 
                        className={ actualizandoDatos? 'btn btn-primary disabled': 'btn btn-primary' }
                        onClick={ buscarPorFecha }
                        >
                            { actualizandoDatos &&
                            <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            }
                            
                                Filtrar
                        </button>
                    </div>
                </div>


            </div>
                {/* ENCABEZADO */}
                <div className="row bg-primary text-white fw-bold">
                    <div className="col-1">
                        <p className="m-0" >#</p>                        
                    </div>
                    <div className="col-3">
                        <p className="m-0" >FECHA</p>                        
                    </div>
                    <div className="col-3">
                        <p className="m-0" >CLIENTE</p>                        
                    </div>
                    <div className="col-2">
                        <p className="m-0" >ITEMS</p>                        
                    </div>
                    <div className="col-2">
                        <p className="m-0" >TOTAL</p>                        
                    </div>
                    <div className="col-1">
                        <p className="m-0" >MAS</p>                        
                    </div>
                </div>
            </div>

        <div className="window-body">
          <div className="container-fluid">
              {(registroCotizaciones.length <= 0)&&
                  <div className="row">
                      <div className="col">
                          <p className="text-muted text-center" >No se encontro ningun registro de cotizaciónes...</p>
                      </div>
                  </div>
              }
              {registroCotizaciones.map( (c, index) => (
                  <ItemListCotizaciones key={index} cotizacion={c} />
              ))}
          </div>
        </div>
        <div className="window-footer">
            <div className="btn btn-success" onClick={ () => { setNuevaCotizacion(!nuevaCotizacion) } } >Nueva cotización</div>
        </div>
      </div>
    </div>
  )
}
