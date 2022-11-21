import React from 'react'
import { useState } from 'react';
import { generarFechaAMD, generarFechaDMA } from '../../../../helpers/dateConfig';
import { DetallesCompra } from './DetallesCompra';
import { PagarSaldo } from './PagarSaldo';

export const ItemCompras = ({ compra }) => {
    const { items } = compra;
    const [detallesCompra, setDetallesCompra] = useState(false);
    const [pagarSaldo, setPagarSaldo] = useState(false);

    const calcularSaldo = () => {
        let saldo = 0;
        compra.saldoPagos.forEach(p => {
            saldo += p.monto           
        });
        return compra.total - saldo;
    }
  return (

    <>
        {/* VENTANAS */}
         {detallesCompra&&
        <DetallesCompra
         detallesCompra={ detallesCompra }
        setDetallesCompra={ setDetallesCompra }
         compra={compra}
        />}
         {pagarSaldo&&
         <PagarSaldo setPagarSaldo={setPagarSaldo} compra={compra} />
        }
        <div className="col-2"> COMPRA Nº{compra.numero} </div>
        <div className="col-1 text-center ">{ generarFechaDMA(generarFechaAMD(compra.fecha))}</div>
        <div className="col-3 text-center ">{compra.proveedor}</div>
        <div className="col-1 text-center ">{items.length}</div>
        <div className="col-1 text-center ">
        { 
        (compra.estado === 'loading') ?
        <span className='mx-2 text-primary popper-msg'  >
            <span>En revisión</span>
            <i className="bi bi-stopwatch-fill"></i>
        </span>
        :
        (compra.estado === 'warning') ?
        <span className='mx-2 text-warning popper-msg' >
            <span>Error en cantidades</span>
            <i className="bi bi-exclamation-triangle-fill"></i>
        </span>
        :
        <span className='mx-2 text-success popper-msg' >
            <span>Material completo</span>
            <i className="bi bi-bookmark-check-fill"></i>
        </span>
        }
        </div>
        <div className="col-1 text-center ">{compra.total - calcularSaldo()} Bs.</div>
        <div className="col-1 text-center ">{calcularSaldo()} Bs.</div>
        <div className="col-1 text-center ">{compra.total} Bs.</div>
        <div className="col-1 text-center ">
        <div className="btn-group">
            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Mas
            </button>
            <ul className="dropdown-menu py-0">
                <li className='px-2 dropdown-item' onClick={() => { setPagarSaldo(s => !s) }} style={{cursor:'pointer'}} >
                    <i className="bi bi-cash"></i> Pagos
                </li>
                <li className='px-2 dropdown-item' onClick={()=>{ setDetallesCompra(!detallesCompra) }} style={{cursor:'pointer'}} >
                    <i className="bi bi-text-left"></i> Detalles
                </li>

            </ul>
        </div>
        </div>     
    
    </>

    // <div className="card text-center mb-3 mt-2">

    //     {/* VENTANAS */}
    //     {detallesCompra&&
    //     <DetallesCompra
    //     detallesCompra={ detallesCompra }
    //     setDetallesCompra={ setDetallesCompra }
    //     compra={compra}
    //     />}
    //     {pagarSaldo&&
    //     <PagarSaldo setPagarSaldo={setPagarSaldo} compra={compra} />
    //     }

    //     <div className="card-header"> 
    //     COMPRA 
    //     <span> Nº{compra.numero} </span>
    //     <span className='fst-italic fw-lighter' > {generarFechaAMD(compra.fecha)} </span> 
    //     { 
    //     (compra.estado === 'loading') ?
    //     <span className='mx-2 text-primary popper-msg'  >
    //         <span>En revisión</span>
    //         <i className="bi bi-stopwatch-fill"></i>
    //     </span>
    //     :
    //     (compra.estado === 'warning') ?
    //     <span className='mx-2 text-warning popper-msg' >
    //         <span>Material incompleto</span>
    //         <i className="bi bi-exclamation-triangle-fill"></i>
    //     </span>
    //     :
    //     <span className='mx-2 text-success popper-msg' >
    //         <span>Material completo</span>
    //         <i className="bi bi-bookmark-check-fill"></i>
    //     </span>
    //     }
    //     </div>

    //     <div className="card-body card-body-scroll ">
    //         <h6 className='card-title fw-bold m-0'> {compra.proveedor} </h6>
    //         <p className='m-0'><span className='fw-bold' >Saldo: </span> {calcularSaldo()} Bs.</p>
    //         <p className='m-0'><span className='fw-bold' >TOTAL: </span> {compra.total} Bs.</p>

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
    //         <div className="btn btn-success btn-sm" onClick={() => { setPagarSaldo(s => !s) }} ><i className="bi bi-cash"></i></div>
    //         <div className='btn btn-outline-primary btn-sm' onClick={()=>{ setDetallesCompra(!detallesCompra) }} >
    //             <i className="bi bi-three-dots"></i>
    //         </div>
    //     </div>
    // </div>
  )
}
