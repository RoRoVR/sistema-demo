import { useState } from "react"
import { RevisarTareaPendiente } from "../windows/RevisarTareaPendiente";

export const TareaPendiente = ( { compra } ) => {
    const date = new Date(compra.fecha);
    const { items } = compra
    const [revisarItem, setRevisarItem] = useState(false);

  return (
    <div className="card text-center mb-3 mt-2">
        {/* VENTANAS */}
        { revisarItem&&
        <RevisarTareaPendiente revisarItem={revisarItem} setRevisarItem={setRevisarItem} item={ compra } />
        }

        <div className="card-header"> 
        COMPRA Nº
        <span>{ compra.numero }</span>
        <span className='fst-italic fw-lighter' > {date.toISOString().split('T')[0]} </span> 
        { 
        (compra.estado === 'loading') ?
        <span className='mx-2 text-primary popper-msg'  >
            <span>Sin revisar</span>
            <i className="bi bi-stopwatch-fill"></i>
        </span>
        :
        (compra.estado === 'warning') ?
        <span className='mx-2 text-warning popper-msg' >
            <span>Material incompleto</span>
            <i className="bi bi-exclamation-triangle-fill"></i>
        </span>
        :
        <span className='mx-2 text-success popper-msg' >
            <span>Material completo</span>
            <i className="bi bi-bookmark-check-fill"></i>
        </span>
        }
        </div>

        <div className="card-body card-body-scroll ">
            <h6 className='card-title fw-bold'> {compra.proveedor} </h6>

            <ol className='list-group list-group-flush list-group-numbered' >
                {items.map(i=>(
                    <li key={i.id} className='list-group-item d-flex justify-content-between align-items-start' >
                        <div className="ms-2 me-auto">
                            <div>{i.modelo}</div>
                        </div>
                        <span className='badge bg-primary rounded-pill' >{i.cantidad}</span>
                    </li>
                ))}
            </ol>
        </div>

        <div className="card-footer d-flex justify-content-between">
            <div className='btn btn-outline-primary' onClick={()=>{ setRevisarItem(!revisarItem) }} > Revisar  </div>
        </div>
    </div>
  )
}
