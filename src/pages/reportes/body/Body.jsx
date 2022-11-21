import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingAplication } from '../../../components/loading-aplication/LoadingAplication';
import { ItemReporte } from '../components/ItemReporte';

export const Body = ({ valuesObj }) => {
  const { cargandoAplicacion, reportes } = useSelector( s => s.reportes );

  const showReportes = reportes.filter(r => r.tipo.includes( valuesObj.filtro.toLowerCase() ) );

  return (
    <div className='aplication-body' >
      {/* ENCABEZADO */}
      <div className="container-fluid">
        <div className="row bg-primary px-1">
          <div className="col-2 text-white text-center ">Fecha</div>
          <div className="col-1 text-white text-center ">Tipo</div>
          <div className="col-5 text-white text-center ">Detalle</div>
          <div className="col-2 text-white text-center ">Usuario</div>
          <div className="col-2 text-white text-center ">Monto</div>
        </div>
      </div>
      <div className="aplication-body-container">
        <div className="container-fluid">
          {cargandoAplicacion&& <LoadingAplication/>}
          {showReportes.map( (r, index) => (
            <ItemReporte key={index} reporte={r} />
          ))}
        </div>
      </div>
    </div>
  )
}
