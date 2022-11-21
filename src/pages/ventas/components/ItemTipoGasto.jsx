import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { upperCamelCase } from "../../../helpers/textConfig";
import { eliminarDocumentoVentas } from "../slices/ventasThunk";
import { AlertNotification } from "./AlertNotification";

export const ItemTipoGasto = ({t}) => {
    const {actualizandoDatos, configuracion:config, tiposGasto} = useSelector( s => s.ventas );
    const dispatch = useDispatch();
    const [alertNotification, setAlertNotification] = useState(false);

    const eliminarPrecioBase = () => {
        const ubicacion = `/ventas/tiposGastos/tiposGastos/${t.id}`;
        dispatch(  eliminarDocumentoVentas( ubicacion, t.id ) );
    }
  return (
    <div key={t.id} className='d-flex' >
        {alertNotification&&
            <AlertNotification 
            alertNotification={alertNotification} 
            setAlertNotification={setAlertNotification}
            titulo={`Eliminar tipo de gasto`}
            mensaje={`Eliminaras ${t.tipo.toUpperCase()} de la lista de tipos de gasto. ¿Deseas continuar?`}
            funcion={ eliminarPrecioBase }
            />
        }
        <p> {upperCamelCase(t.tipo)} </p>
        <button className="btn-icon-danger ms-auto" onClick={() => {setAlertNotification(s => !s)}}  disabled={ actualizandoDatos } >
        {
            actualizandoDatos ? 
            <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            :
            <i className="bi bi-trash-fill"></i>
        } 
        </button>
    </div>
  )
}
