import React from 'react';
import { useSelector } from 'react-redux'
import { LoadingAplication } from '../../../components/loading-aplication/LoadingAplication'
import { ItemCompras } from './compras/ItemCompras';
import { ItemPedidos } from './pedidos/ItemPedidos';

export const Body = ({ valuesObj }) => {
  
  const { cargandoAplicacion, pedidos, compras } = useSelector( s => s.compras );

  const showPedidos = pedidos.filter( p =>{
    if( p.proveedor.toLocaleLowerCase().includes(valuesObj.proveedor.toLocaleLowerCase()) ){
      return p;
    }});
  
  const showCompras = compras.filter( c =>{
    if( c.proveedor.toLocaleLowerCase().includes(valuesObj.proveedor.toLocaleLowerCase()) ){
      return c;
    }});


  return (
    <div className='aplication-body' >
      
      <div className="container-fluid">
        {/* ENCABEZADO */}
        <div className="row bg-primary px-1">
          <div className="col-2 text-white text-center ">Tipo</div>
          <div className="col-1 text-white text-center ">Fecha</div>
          <div className="col-3 text-white text-center ">Proveedor</div>
          <div className="col-1 text-white text-center ">Items</div>
          <div className="col-1 text-white text-center ">Estado</div>
          <div className="col-1 text-white text-center ">Pagado</div>
          <div className="col-1 text-white text-center ">Restante</div>
          <div className="col-1 text-white text-center ">Total</div>
          <div className="col-1 text-white text-center ">Acciones</div>
        </div>
      </div>

      <div className="aplication-body-container">
        { cargandoAplicacion&& <LoadingAplication/>}

        <div className="container-fluid pb-5">
        {/* {(valuesObj.filtro === 'compras') ?
            <></>
            :
            <div className="row">
              {pedidos.map(pedido => {
                return(
                  <div key={pedido.id} className="col-3">
                    <ItemPedidos pedido={pedido} />
                  </div>
                )
              })}
            </div>
          } */}

          {(valuesObj.filtro === 'compras') ?
            <></>
            :
            <>
              {showPedidos.map(pedido => {
                return(
                  <div key={pedido.id} className="row border rounded mb-2 py-2">
                    <ItemPedidos pedido={pedido} />
                  </div>
                )
              })}
            </>
          }

          {/* {(valuesObj.filtro === 'pedidos') ?
            <></>
            :
            <div className="row">
              {compras.map(compra => {
                return(
                  <div key={compra.id} className="col-3">
                    <ItemCompras compra={compra} />
                  </div>
                )
              })}
            </div>
          } */}

          {(valuesObj.filtro === 'pedidos') ?
            <></>
            :
            <>
              {showCompras.map(compra => {
                return(
                  <div key={compra.id} className="row border rounded mb-2 py-2">
                    <ItemCompras compra={compra} />
                  </div>
                )
              })}
            </>
          }


        </div>
      </div>   
    </div>
  )
}
