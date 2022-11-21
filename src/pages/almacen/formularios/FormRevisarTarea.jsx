import React from 'react'

export const FormRevisarTarea = ({ formValues, handleInputChange, refDetalle }) => {
  return (
    <div className='container-fluid' >
        <div className="row px-2 mb-2">
            <div className="col-5 fw-bold text-start">
                DESCRIPCION
            </div>
            <div className="col-2 fw-bold text-start">
                MARCA
            </div>
            <div className="col fw-bold text-start">
                MODELO
            </div>
            <div className="col fw-bold text-start">
                PEDIDO
            </div>
            <div className="col fw-bold text-start">
                RECIBIDO
            </div>
        </div>
        {formValues.map((item, index) => (
            <div key={item.id} className='row px-2 mb-2' >
                <div className="col-5 px-1">
                    <input 
                    className='form-control py-1' 
                    type="text" 
                    autoComplete='off'
                    value={item.nombre}
                    disabled
                    />
                </div>

                <div className="col-2 px-1">
                    <input 
                    className='form-control py-1' 
                    type="text" 
                    autoComplete='off'
                    value={item.marca}
                    disabled
                    />
                </div>

                <div className="col px-1">
                    <input 
                    className='form-control py-1' 
                    type="text" 
                    autoComplete='off'
                    value={item.modelo}
                    disabled
                    />
                </div>

                <div className="col px-1">
                    <input 
                    className='form-control py-1' 
                    type="text" 
                    autoComplete='off'
                    value={item.cantidad}
                    disabled
                    />
                </div>

                <div className="col px-1 position-relative">
                    <input 
                    className='form-control py-1' 
                    type="number" 
                    autoComplete='off'
                    name= {`cantidadResivida_${index}`}
                    onChange={handleInputChange}
                    value={item.cantidadResivida}
                    required
                    />

                    {item.cantidadResivida === ''?
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary p-1">
                            <i className="bi bi-clock-history"></i>
                            <span className="visually-hidden">mensaje</span>
                        </span>
                        :
                        <></>
                    }
                    { item.cantidadResivida == item.cantidad?
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success p-1">
                            <i className="bi bi-check-lg"></i>
                            <span className="visually-hidden">mensaje</span>
                        </span>
                        :
                        <></>
                    }
                    {(item.cantidadResivida != item.cantidad) && (item.cantidadResivida !== '')?
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning p-1">
                            <i className="bi bi-exclamation-triangle"></i>
                            <span className="visually-hidden">mensaje</span>
                        </span>
                        :
                        <></>
                    }
                </div>
            </div>
        ))
        }
        <div className="row text-start">
            <div className="col">
                <label htmlFor="detalle" className='fw-bold' >Detalle:</label>
                <input 
                className='form-control py-1' 
                type="text" 
                id='detalle'
                autoComplete='off'
                ref={ refDetalle }
                />
            </div>
        </div>
    </div>
  )
}
