import { useDispatch, useSelector } from "react-redux";
import { upperCamelCase } from '../../../helpers/textConfig';
import { editarDocumentoVentas, eliminarDocumentoVentas} from "../slices/ventasThunk";
import { useState } from "react";
import { NuevoTipoGasto } from "./NuevoTipoGasto";
import { AlertNotification } from "../components/AlertNotification";
import { ItemTipoGasto } from "../components/ItemTipoGasto";


export const Configuracion = ({setConfiguracion}) => {
    const {precios} = useSelector( s => s.productos );
    const {actualizandoDatos, configuracion:config, tiposGasto} = useSelector( s => s.ventas );
    const dispatch = useDispatch();
    const [nuevoTipoGasto, setNuevoTipoGasto] = useState(false);    

    const guardarPrecioBase = (tipo) => {
        const values = { precioBase: tipo }
        const ubicacion = '/ventas/configuracion';
        dispatch( editarDocumentoVentas( ubicacion, values ) );
    }

  return (
    <div className='window'>
        {/* VENTANAS */}
        {nuevoTipoGasto&&
            <NuevoTipoGasto setNuevoTipoGasto={setNuevoTipoGasto} />
        }
        <div className="window-container-sm">
            <div className="window-head">
                <span>CONFIGURACIONES</span>
                <div className="btn-exit" onClick={ () => { setConfiguracion(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body my-2">
                <div className="accordion accordion-flush" id="accordionFlushExample" >
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                <span className="fw-bold" >PRECIO BASE</span>
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <ul className="list-group list-group-flush" >
                                    {precios.map((p, index) => (
                                        <div key={index} className='d-flex' >
                                            <p> {upperCamelCase( p.tipo )}</p>
                                            <span 
                                            className="ms-auto" 
                                            >
                                                {(config.precioBase === p.tipo)?
                                                <i className="bi bi-check-circle-fill text-success"></i> 
                                                :
                                                <>{actualizandoDatos?
                                                    <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    :
                                                    <i 
                                                    className="bi bi-check-circle text-secondary" 
                                                    style={{ cursor:'pointer' }}
                                                    onClick= {() => guardarPrecioBase(p.tipo)}
                                                    ></i>                                               
                                                }</>}
                                            </span>
                                        </div>
                                    ))}
                                </ul>                                
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                <span className="fw-bold" >TIPOS DE GASTO</span>
                            </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <ul className="list-group list-group-flush" >
                                    {tiposGasto.map(t => (
                                        <ItemTipoGasto key={t.id} t={t} />
                                    ))} 
                                </ul> 
                                <span 
                                className="text-primary" 
                                style={{ cursor:'pointer' }} 
                                onClick={()=>{ setNuevoTipoGasto( !nuevoTipoGasto ) }} 
                                >Registrar nuevo tipo de gasto...
                                </span>                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
