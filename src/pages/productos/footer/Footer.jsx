
export const Footer = (
  { registrarProducto , setRegistrarProducto, windowConfig, setWindowConfig, reporte, setReporte }
  ) => {
  
  return (
    <div className='aplication-footer' >
      <div className="container-fluid">
        <div className="row">
          <div className="col-10">
            <div className='btn btn-primary me-3' onClick={()=>{ setRegistrarProducto(!registrarProducto) }}  >Nuevo Producto</div>
            <div className='btn btn-secondary' onClick={()=>{ setReporte(!reporte) }}  >Generar Reporte</div>
          </div>
          <div className="col-2">
            <div className="btn-icon-secondary ms-auto" onClick={()=>{ setWindowConfig(!windowConfig) }} ><i className="bi bi-gear-fill"></i></div>
          </div>
        </div>
      </div>
    </div>
  )
}
