import { generarFechaAMD, generarFechaDMA } from "../../../../helpers/dateConfig";
import { cuatroDecimales } from "../../../../helpers/numConfig";
import logo from '../../../../assets/svg/logo-letra.svg';
import { useRef } from "react";
import { pdfDetalleCompra } from "../../pdf/pdfDetalleCompra";

export const DetallesCompra = ({setDetallesCompra, detallesCompra, compra}) => {
    const table = useRef();

    const descargarDetalleCompra = () => {
        const id = table.current.id;
        const datos = {
            numero: compra.numero,
            fecha: generarFechaDMA(generarFechaAMD(compra.fecha)),
            fechaRecibido: compra.fechaRecibido? generarFechaDMA(generarFechaAMD(compra.fechaRecibido)) : '',
            proveedor: compra.proveedor,
            usuarioCompra: compra.usuarioCompra.nombre,
            usuarioRecibido: compra.usuarioRecibido.nombre,
            detalle: (compra.detalle? compra.detalle: '' )
        }
        pdfDetalleCompra( id, datos );
    }

    const mandarRevision = () => {
        const newCompra = {
            estado: 'loading',
            detalle: (compra.detalle? compra.detalle: '' ),
            fecha: compra.fecha,
            fechaRecibido: compra.fechaRecibido,
            items: compra.items,
            numero: compra.numero,
            proveedor: compra.proveedor,
            saldo: compra.saldo,
            saldoPagos: compra.saldoPagos,
            total: compra.total,
            usuarioCompra: compra.usuarioCompra,
            usuarioRecibido: compra.usuarioRecibido
        }
        console.log( newCompra );
    }



    return (
      <div className='window' >
          <div className="window-container">
              <div className="window-head">
                  <span>DETALLES DE COMPRA Nº {compra.numero} </span>
                  <div className="btn-exit" onClick={ () => { setDetallesCompra(!detallesCompra) } } >
                      <i className="bi bi-x"></i>
                  </div>
              </div>
  
              <div className="window-body">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-8">
                            <img src={logo} style={{ height:'80px' }} />
                        </div>
                        <div className="col-4">
                            <p className="text-start mb-0" >
                                <span className="fw-bold">Fecha de compra: </span> { generarFechaDMA(generarFechaAMD(compra.fecha))} 
                            </p>
                            <p className="text-start mb-0" >
                                <span className="fw-bold">Fecha de entrega: </span> 
                                {compra.fechaRecibido?
                                 generarFechaDMA(generarFechaAMD(compra.fechaRecibido))
                                 :
                                 ''
                                } 
                            </p>
                        </div>
                    </div>
                    <div className="row mb-2">
                        <div className="col-12">
                            <p className="text-start mb-0" ><span className="fw-bold">Proveedor: </span> {compra.proveedor} </p>
                        </div>
                        <div className="col-12">
                            <p className="text-start mb-0" ><span className="fw-bold">Comprado por: </span> {compra.usuarioCompra.nombre} - {compra.usuarioCompra.cargo} </p>
                        </div>
                        <div className="col-12">
                            <p className="text-start mb-0" >
                                <span className="fw-bold"> Recibido por: </span> 
                                {(compra.usuarioRecibido === '') ?
                                    <span></span>
                                    :
                                    <span>{compra.usuarioRecibido.nombre} - {compra.usuarioRecibido.cargo}</span> 
                                }
                            </p>
                        </div>
                        <div className="col-12">
                            <p className="text-start mb-0" >
                                <span className="fw-bold">Detalle: </span>
                                 {compra.detalle ? compra.detalle: '' } 
                            </p>
                        </div>
                    </div>
                </div>

                <table className='table table-hover' id="tableDetalleCompra"  ref={table} >
                    <thead >
                        <tr>
                            <th scope='col' >Nº</th>
                            <th scope='col' >Nombre</th>
                            <th scope='col' >Marca</th>
                            <th scope='col' >Modelo</th>
                            <th scope='col' >Cantidad</th>
                            <th scope='col' >Recibido</th>
                            <th scope='col' >Precio Unit.</th>
                            <th scope='col' >Precio</th>
                        </tr>
                    </thead>

                    <tbody>
                        {compra.items.map((i, index) => (
                            <tr key={i.id} >
                                <th scope="row">{index+1}</th>
                                <td>{i.nombre}</td>
                                <td>{i.marca}</td>
                                <td>{i.modelo}</td>
                                <td>{i.cantidad}</td>
                                <td>{i.cantidadResivida}</td>
                                <td>{i.precio}</td>
                                <td>{ cuatroDecimales( i.precio * i.cantidad )}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr className="table-active" >
                          <th className="text-end" colSpan='7' >TOTAL</th>
                          <th >{compra.total}</th>
                        </tr>
                    </tfoot>
                  </table>
              </div>

              <div className="window-footer">
                <div className="btn btn-danger me-3" onClick={descargarDetalleCompra} > <i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
                {/* <div className="btn btn-secondary me-3" onClick={mandarRevision} > <i className="bi bi-pencil-square"></i> Mandar a revision</div> */}
              </div>
          </div>
      </div>
    )
  }
  