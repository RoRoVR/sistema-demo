import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { generarFechaAMD, generarFechaDMA } from '../../../../helpers/dateConfig';
import { AlertNotification } from '../../components/AlertNotification';
import { eliminarDocumentoFirebase } from '../../slices/comprasThunk';
import { NuevaCompra } from '../../windows/registros/NuevaCompra';
import { DetallesPedido } from './DetallesPedido';

export const ItemPedidos = ({ pedido }) => {
    const dispatch = useDispatch();
    const date = new Date(pedido.fecha);
    const { items } = pedido;
    const [alertNotification, setAlertNotification] = useState(false);
    const [nuevaCompra, setNuevaCompra] = useState(false);
    const [detallesPedido, setDetallesPedido] = useState(false);


    const eliminarPedido = ()=>{

        const ubicacion = `/aplicaciones/compras/pedidos/${pedido.id}`;
        dispatch( eliminarDocumentoFirebase( ubicacion, pedido.id ) );
    }

  return (
    <>
        {/* VENTANAS */}
        { alertNotification&& 
        <AlertNotification 
        alertNotification={alertNotification} 
        setAlertNotification={setAlertNotification} 
        titulo={`Eliminar Pedido`} 
        mensaje={`¿Deseas eliminar el pedido de ${generarFechaDMA(generarFechaAMD(pedido.fecha))}?`} 
        funcion={eliminarPedido}
        />
        }

        { nuevaCompra&& 
        <NuevaCompra nuevaCompra={nuevaCompra} setNuevaCompra={setNuevaCompra} pedido={pedido}  />
        }

        { detallesPedido &&
        <DetallesPedido  setDetallesPedido={setDetallesPedido} detallesPedido={detallesPedido} pedido = {pedido}/>
        }


        <div className="col-2 ">PEDIDO</div>
        <div className="col-1 text-center ">{ generarFechaDMA(generarFechaAMD(pedido.fecha))}</div>
        <div className="col-3 text-center ">{pedido.proveedor}</div>
        <div className="col-1 text-center ">{items.length}</div>
        <div className="col-1 text-center "></div>
        <div className="col-1 text-center "></div>
        <div className="col-1 text-center "></div>
        <div className="col-1 text-center "></div>
        <div className="col-1 text-center ">
            <div className="btn-group">
                <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Mas
                </button>
                <ul className="dropdown-menu py-0">
                    <li className='px-2 dropdown-item' onClick={()=>{ setNuevaCompra(!nuevaCompra) }} style={{cursor:'pointer'}} >
                        <i className="bi bi-cart"></i> Comprar
                    </li>
                    <li className='px-2 dropdown-item' onClick={()=>{ setDetallesPedido(!detallesPedido) }} style={{cursor:'pointer'}} >
                        <i className="bi bi-text-left"></i> Detalles
                    </li>
                    <li><hr className='dropdown-divider'/></li>
                    <li className='px-2 dropdown-item' onClick={()=>{ setAlertNotification(!alertNotification) }} style={{cursor:'pointer'}} >
                        <i className="bi bi-trash"></i> Eliminar
                    </li>

                </ul>
            </div>
        </div>
    </>

    // <div className="card text-center mb-3 mt-2">

    //     {/* VENTANAS */}
    //     { alertNotification&& 
    //     <AlertNotification 
    //     alertNotification={alertNotification} 
    //     setAlertNotification={setAlertNotification} 
    //     titulo={`Eliminar Pedido`} 
    //     mensaje={`Eliminar PEDIDO de fecha ${pedido.fecha}`} 
    //     funcion={eliminarPedido}
    //     />}

    //     { nuevaCompra&& 
    //     <NuevaCompra nuevaCompra={nuevaCompra} setNuevaCompra={setNuevaCompra} pedido={pedido}  />}

    //     { detallesPedido &&
    //     <DetallesPedido  setDetallesPedido={setDetallesPedido} detallesPedido={detallesPedido} pedido = {pedido} />
    //     }

    //     <div className="card-header"> 
    //         PEDIDO <span className='fst-italic fw-lighter' >{generarFechaAMD(pedido.fecha)} </span> 
    //     </div>

    //     <div className="card-body card-body-scroll ">
    //         <h6 className='card-title fw-bold'> {pedido.proveedor} </h6>

    //         <ol className='list-group list-group-flush list-group-numbered' >
    //             {items.map(i=>(
    //                 <li key={i.id} className='list-group-item d-flex justify-content-between align-items-start' >
    //                     <div className="ms-2 me-auto">
    //                         <div>{i.modelo}</div>
    //                     </div>
    //                     <span className='badge bg-primary rounded-pill' >{i.cantidad}</span>
    //                 </li>
    //             ))}
    //         </ol>
    //     </div>

    //     <div className="card-footer d-flex justify-content-between">

    //         <div className='btn btn-outline-primary' onClick={()=>{ setDetallesPedido(!detallesPedido) }} > Detalles  </div>
    //         <div className='btn-icon-success ms-auto' onClick={()=>{ setNuevaCompra(!nuevaCompra) }} ><i className="bi bi-cart-fill"></i></div>
    //         <div className="btn-icon-danger ms-2" onClick={()=>{ setAlertNotification(!alertNotification) }} > <i className="bi bi-trash-fill"></i> </div>
    //     </div>
    // </div>
  )
}
