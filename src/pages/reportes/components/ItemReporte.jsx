import React from 'react'
import { generarFechaHoraAMD } from '../../../helpers/dateConfig'

export const ItemReporte = ({reporte}) => {

  return (
    <div className='row border rounded mb-2 py-1' >
        <div className="col-2 text-center ">{ generarFechaHoraAMD(reporte.fecha) }</div>
        <div className="col-1 text-center ">{reporte.tipo}</div>
        <div className="col-5 text-center ">{reporte.detalle}</div>
        <div className="col-2 text-center ">{reporte.usuario.nombre}</div>
        <div className="col-2 text-center ">{reporte.monto} Bs.</div>
        {/* <div className="col-1 d-flex justify-content-center align-items-center">
          <div className="btn-icon-white"><i className="bi bi-three-dots"></i></div>
        </div> */}
    </div>
  )
}
