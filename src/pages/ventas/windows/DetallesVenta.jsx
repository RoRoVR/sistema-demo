import { useState } from 'react';
import logo from '../../../assets/svg/logo-letra.svg';
import { generarFechaAMD } from '../../../helpers/dateConfig';
import { unDecimal } from '../../../helpers/numConfig';
import { pdfDetallesVenta } from '../pdf/pdfDetallesVenta';
import { PagosVenta } from './PagosVenta';

export const DetallesVenta = ({ setDetallesVenta, venta }) => {

    const [pagosVenta, setPagosVenta] = useState(false);

    const descargarPdf = () => {
        let items = [];
        let datos = {
            numero: venta.numero,
            fecha: generarFechaAMD(venta.fecha),
            nombre: venta.cliente.nombre,
            nit: venta.cliente.nit,
            cel: venta.cliente.contacto,
            correo: venta.cliente.correo,
            vendedor: venta.vendedor.nombre,
            contacto: venta.vendedor.contacto,
            total: venta.total,
        }
        
        //CREAMOS LA MATRIZ PARA GENERAR EL PDF
        venta.items.forEach((i, index) => {
            let newItem = [ 
                (index + 1), 
                i.modelo, 
                i.marca.toUpperCase(), 
                i.nombre.toUpperCase(), 
                i.medida.toUpperCase(), 
                i.cantVenta,
                i.precioVenta,
                unDecimal(i.cantVenta * i.precioVenta)
             ]
            items = [ ...items, newItem ];          
        });
        pdfDetallesVenta( items, datos );
    }
    
  return (
    <div className='window'>
        {/* VENTANAS */}
        {pagosVenta&&
         <PagosVenta setPagosVenta={setPagosVenta} venta={ venta }  />
        }
        <div className="window-container">
            <div className="window-head">
                <span>DETALLES DE VENTA Nº{ venta.numero }</span>
                <div className="btn-exit" onClick={ () => {setDetallesVenta(s => !s)} } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <img src={logo} style={{ height:'80px' }}/> 
                        </div>
                        <div className="col">
                            <p className='fw-bold m-0' >PROFORMA Nº {venta.numero}</p>
                            <p className='m-0' ><span className='fw-bold'> Tipo de pago:</span> {venta.tipoPago.toUpperCase()}</p>
                            <p className='m-0' ><span className='fw-bold'> Fecha:</span> {generarFechaAMD(venta.fecha)}</p>
                            <p className='m-0' ><span className='fw-bold'> Vendedor:</span> {venta.vendedor.nombre}</p>
                            <p className='m-0' ><span className='fw-bold'> Contacto:</span> {venta.vendedor.contacto}</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <p className='m-0' ><span className='fw-bold'> Nombre:</span> {venta.cliente.nombre}</p> 
                            <p className='m-0' ><span className='fw-bold'> NIT:</span> {venta.cliente.nit}</p>
                        </div>
                        <div className="col">
                        <p className='m-0' ><span className='fw-bold'> Cel:</span> {venta.cliente.contacto}</p> 
                            <p className='m-0' ><span className='fw-bold'> Correo:</span> {venta.cliente.correo}</p>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                        <table className="table table-borderless table-striped">
                            <thead>
                                <tr className='bg-secondary text-white' >
                                    <th className='py-0' scope="col">Nº</th>
                                    <th className='py-0' scope="col">MODELO</th>
                                    <th className='py-0' scope="col">MARCA</th>
                                    <th className='py-0' scope="col">NOMBRE</th>
                                    <th className='py-0' scope="col">U/M</th>
                                    <th className='py-0' scope="col">CANT</th>
                                    <th className='py-0' scope="col">P/UNIT</th>
                                    <th className='py-0' scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {venta.items.map((i, index) => (
                                    <tr key={index} >
                                        <td className='py-1' > {index + 1} </td>
                                        <td className='py-1' > {i.modelo.toUpperCase()} </td>
                                        <td className='py-1' > {i.marca.toUpperCase()} </td>
                                        <td className='py-1' > {i.nombre.toUpperCase()} </td>
                                        <td className='py-1' > {i.medida.toUpperCase()} </td>
                                        <td className='py-1' > {i.cantVenta} </td>
                                        <td className='py-1' > {i.precioVenta} </td>
                                        <td className='py-1' > { unDecimal(i.cantVenta * i.precioVenta) } </td>
                                    </tr>
                                ))}

                                <tr className='bg-primary fw-bold'>
                                    <td className='py-1 text-end text-white' colSpan='7' >TOTAL</td>
                                    <td className='py-1 text-white'> {venta.total} Bs. </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="window-footer">
                {venta.tipoPago !== 'efectivo' &&
                    <div className="btn btn-secondary me-3" onClick={() => { setPagosVenta(s => !s) }} > Registro de pagos</div>
                }
                <div className="btn btn-danger me-3" onClick={descargarPdf}> <i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
            </div>
        </div>
    </div>
  )
}
