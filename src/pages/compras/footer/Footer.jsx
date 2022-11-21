
import { useState } from 'react';
import { ListaProveedores } from '../windows/listas/ListaProveedores'
import { NuevaCompra } from '../windows/registros/NuevaCompra';
import { NuevoPedido } from './windows/NuevoPedido';
import { ReporteCompras } from './windows/ReporteCompras';

export const Footer = ({valuesObj}) => {
  const [windowListaProveedores, setWindowListaProveedores] = useState(false);
  const [nuevoPedido, setNuevoPedido] = useState(false);
  const [nuevaCompra, setNuevaCompra] = useState(false);
  const [reporteCompras, setReporteCompras] = useState(false);

  const date = new Date();
  // pedido = { fecha:'', proveedor:'', items:[cantidad:'',id:'', marca:'', modelo:'', nombre:''] }
  const pedidoBlanco = {
    // fecha: date.toISOString().split('.')[0],
    // fecha: date.toLocaleString(),
    proveedor:'',
    items:[ {cantidad:'', id: Date.now(), marca:'', modelo:'', nombre:'' } ]
  }

  return (
    <>
      {/* VENTANAS */}
      {windowListaProveedores&& 
      <ListaProveedores windowListaProveedores={windowListaProveedores} setWindowListaProveedores={setWindowListaProveedores} />}
      {nuevoPedido&&  
      <NuevoPedido nuevoPedido={nuevoPedido} setNuevoPedido={setNuevoPedido} />}
      { nuevaCompra&&  
      <NuevaCompra nuevaCompra={ nuevaCompra } setNuevaCompra={ setNuevaCompra } pedido={ pedidoBlanco } /> }
      {reporteCompras&&
      <ReporteCompras setReporteCompras={setReporteCompras} valuesObj={valuesObj} />}

      <div className='aplication-footer' >
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="btn btn-primary me-3" onClick={()=>{ setNuevaCompra(!nuevaCompra) }} >Comprar</div>
                <div className="btn btn-primary me-3" onClick={()=>{ setNuevoPedido(!nuevoPedido) }} >Pedido</div>
                <div className="btn btn-primary me-3" onClick={()=>{ setWindowListaProveedores(!windowListaProveedores) }} > Proveedores</div>
              </div>
              <div className="col d-flex justify-content-end ">
                <div className='btn btn-secondary' onClick={() => { setReporteCompras(!reporteCompras) }} > Reporte de compras </div>
              </div>
            </div>
          </div>
      </div>
    </>

  )
}
