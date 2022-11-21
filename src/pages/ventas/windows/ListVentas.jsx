import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ItemListVenta } from "../components/ItemListVenta";
import { resetBusquedaCliente } from "../slices/ventasSlice";
import { buscarColeccionListaVentasPorNumero, obtenerColeccionListaVentasPorFecha } from "../slices/ventasThunk";
import { BuscarCliente } from "./BuscarCliente";
import { ReporteVentas } from "./ReporteVentas";
import { VistaPdfVentas } from "./VistaPdfVentas";


export const ListVentas = ({setListVentas}) => {
    const date = new Date();
    const primer = new Date(date.getFullYear(), date.getMonth(), 1);
    const primerDia = primer.toISOString().split('T')[0];
    const ultimo = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const ultimoDia = ultimo.toISOString().split('T')[0];
    const dispatch = useDispatch();
    const { registroVentas, actualizandoDatos, busquedaCliente } = useSelector(s => s.ventas);

    const inputFechaIni = useRef();
    const inputFechaFin = useRef();
    const inputNumero = useRef();
    const [tipoPago, setTipoPago] = useState('');
    const [reporteVentas, setReporteVentas] = useState(false);
    const [buscarCliente, setBuscarCliente] = useState(false);
    const [vistaPdfVentas, setVistaPdfVentas] = useState(false);

    useEffect(() => {
        dispatch( obtenerColeccionListaVentasPorFecha( primerDia, ultimoDia ) );      
    }, []);

    const showRegistroVentas = registroVentas.filter(i => {
        if(i.tipoPago.toLowerCase().includes(tipoPago)){
            if(busquedaCliente.cliente.codigo){
                if( i.idCliente === busquedaCliente.cliente.codigo ){
                    return i;
                }
            }
            else{
                return i;
            }
        }
    });

    const filtrarTipoPago = ({target}) => {
        setTipoPago( target.value );
    }
    
    const buscarPorFecha = () => {
        const i = inputFechaIni.current.value;
        const f = inputFechaFin.current.value;
        if( i !== '' || f !== '' ){
            dispatch( obtenerColeccionListaVentasPorFecha( i, f ) ); 
        }
    }

    const buscarPorNumero = () => {
        const num =  parseInt(inputNumero.current.value);
        if( num !== '' ){
            dispatch( buscarColeccionListaVentasPorNumero(num) );
        }
    }
  return (
    <div className='window'>
        {/* VENTANAS */}
        {reporteVentas&&
        <ReporteVentas 
        setReporteVentas={setReporteVentas}
        tipoPago={ tipoPago }
        />
        }
        {buscarCliente&&
        <BuscarCliente setBuscarCliente={setBuscarCliente}/>
        }
        {vistaPdfVentas&&
        <VistaPdfVentas 
        setVistaPdfVntas={ setVistaPdfVentas } 
        showRegistroVentas={showRegistroVentas}
        primerDia={primerDia} 
        ultimoDia={ultimoDia} 
        />
        }

        <div className="window-container">
            <div className="window-head">
                <span>LISTA DE VENTAS</span>
                <div className="btn-exit" onClick={ () => { 
                    setListVentas(s => !s);
                    dispatch(resetBusquedaCliente()); 
                    } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="container-fluid">
            <div className="row my-3">
                <div className="col d-flex">
                    <div className="col-2">
                        <input
                        type='number'
                        placeholder="#"
                        className="form-control form-control-sm"
                        ref={inputNumero}
                        />
                    </div>
                    <div className="col-3 ms-2 me-2">
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
                    <div className="col-5 me-auto">
                        <select 
                        className="form-select form-select-sm"
                        onChange={filtrarTipoPago}
                        >
                            <option value=''>Tipo de Pago</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="credito">Credito</option>
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
                            defaultValue={ primerDia }
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
                    <div className="col-2">
                        <p className="m-0" >FECHA</p>                        
                    </div>
                    <div className="col-3">
                        <p className="m-0" >CLIENTE</p>                        
                    </div>
                    <div className="col-2">
                        <p className="m-0" >PAGO</p>                        
                    </div>
                    <div className="col-1">
                        <p className="m-0" >PAGADO</p>                        
                    </div>
                    <div className="col-1">
                        <p className="m-0" >RESTANTE</p>                        
                    </div>
                    <div className="col-1">
                        <p className="m-0" >TOTAL</p>                        
                    </div>
                    <div className="col-1">
                        <p className="m-0" >MAS</p>                        
                    </div>
                </div>
            </div>
            
            <div className="window-body">
                <div className="container-fluid">
                    {(showRegistroVentas.length <= 0)&&
                        <div className="row">
                            <div className="col">
                                <p className="text-muted text-center" >No se encontro ningun registro de ventas...</p>
                            </div>
                        </div>
                    }
                    {showRegistroVentas.map( (v, index) => (
                        <ItemListVenta key={index} venta={v}/>
                    ))}
                </div>
            </div>
            <div className="window-footer">
                {busquedaCliente.cliente.nombre&&
                <>
                    <div className="d-flex justify-content-center align-items-center">
                        <span className="me-2 fw-bold" > Compras de {busquedaCliente.cliente.nombre}</span>
                    </div>
                    <div className="me-auto d-flex justify-content-center align-items-center">
                        <div className="btn-icon-danger-sm" onClick={() => { dispatch(resetBusquedaCliente()) }} > <i className="bi bi-x-lg"></i> </div>
                    </div>
                </>
                }
                <div className="d-flex justify-content-center align-items-center me-3">
                    <div className="btn-icon-danger" onClick={() => { setVistaPdfVentas(!vistaPdfVentas) }} ><i className="bi bi-file-earmark-pdf-fill"></i></div>
                </div>
                <div className="btn btn-primary me-3" onClick={() => { setBuscarCliente(!buscarCliente) }} >Filtrar cliente</div>

                
                <div className="btn btn-secondary" onClick={() => { setReporteVentas(!reporteVentas) }} > Reporte de ventas </div>
            </div>
        </div>
    </div>
  )
}
