import { useState } from "react"
import { generarFechaHoraAMD } from "../../../helpers/dateConfig"
import { DetallesCotizacion } from "../windows/DetallesCotizacion";

export const ItemListCotizaciones = ({ cotizacion }) => {

    const [detallesCotizacion, setDetallesCotizacion] = useState(false);

  return (
    <>
    {detallesCotizacion&&
        <DetallesCotizacion setDetallesCotizacion={setDetallesCotizacion} cotizacion={ cotizacion }  />
    }
        <div className="row border rounded mb-2 py-1">
            
            <div className="col-1">
                <p className="m-0" > { cotizacion.numero } </p>
            </div>
            <div className="col-3">
                <p className="m-0" > { generarFechaHoraAMD(cotizacion.fecha)} </p>
            </div>
            <div className="col-3">
                <p className="m-0" > { cotizacion.cliente } </p>
            </div>
            <div className="col-2">
                <p className="m-0" > { cotizacion.items.length }</p>
            </div>
            <div className="col-2">
                <p className="m-0" > { cotizacion.total } Bs. </p>
            </div>
            <div className="col-1">
                <div className="btn-icon-white" onClick={() => { setDetallesCotizacion(!detallesCotizacion) }} >
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
        </div>
    </>
  )
}
