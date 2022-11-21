import logo from '../../../assets/svg/logo-letra.svg';
import { generarFechaAMD } from '../../../helpers/dateConfig';
import { unDecimal } from '../../../helpers/numConfig';
import { pdfDetallesCotizacion } from '../pdf/pdfDetallesCotizacion';

export const DetallesCotizacion = ({ setDetallesCotizacion, cotizacion }) => {

    const descargarPdf = () => {
        let items = [];
        let datos = {
            numero: cotizacion.numero,
            fecha: generarFechaAMD(cotizacion.fecha),
            nombre: cotizacion.cliente,
            cel: cotizacion.contacto,
            vendedor: cotizacion.vendedor.nombre,
            contacto: cotizacion.vendedor.contacto,
            total: cotizacion.total,
        }
        
        //CREAMOS LA MATRIZ PARA GENERAR EL PDF
        cotizacion.items.forEach((i, index) => {
            let newItem = [ 
                (index + 1), 
                i.modelo, 
                i.marca.toUpperCase(), 
                i.nombre.toUpperCase(),  
                i.cantidad,
                i.precio,
                unDecimal(i.cantidad * i.precio)
             ]
            items = [ ...items, newItem ];          
        });
        pdfDetallesCotizacion( items, datos );
    }

  return (
    <div className='window'>
        <div className="window-container">
            <div className="window-head">
                <span>DETALLES DE COTIZACION Nº{ cotizacion.numero }</span>
                <div className="btn-exit" onClick={ () => {setDetallesCotizacion(s => !s)} } >
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
                            <p className='fw-bold m-0' >COTIZACION Nº {cotizacion.numero}</p>
                            <p className='m-0' ><span className='fw-bold'> Fecha:</span> {generarFechaAMD(cotizacion.fecha)}</p>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <p className='m-0' ><span className='fw-bold'> Nombre:</span> {cotizacion.cliente}</p> 
                            <p className='m-0' ><span className='fw-bold'> Contacto:</span> {cotizacion.contacto}</p> 
                        </div>
                        <div className="col">
                            <p className='m-0' ><span className='fw-bold'> Vendedor:</span> {cotizacion.vendedor.nombre}</p>
                            <p className='m-0' ><span className='fw-bold'> Contacto:</span> {cotizacion.vendedor.contacto}</p>
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
                                    <th className='py-0' scope="col">CANT</th>
                                    <th className='py-0' scope="col">P/UNIT</th>
                                    <th className='py-0' scope="col">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cotizacion.items.map((c, index) => (
                                    <tr key={index} >
                                        <td className='py-1' > {index + 1} </td>
                                        <td className='py-1' > {c.modelo.toUpperCase()} </td>
                                        <td className='py-1' > {c.marca.toUpperCase()} </td>
                                        <td className='py-1' > {c.nombre.toUpperCase()} </td>
                                        <td className='py-1' > {c.cantidad} </td>
                                        <td className='py-1' > {c.precio} </td>
                                        <td className='py-1' > { unDecimal(c.cantidad * c.precio) } </td>
                                    </tr>
                                ))}

                                <tr className='bg-primary fw-bold'>
                                    <td className='py-1 text-end text-white' colSpan='6' >TOTAL</td>
                                    <td className='py-1 text-white'> {cotizacion.total} Bs. </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="window-footer">
                <div className="btn btn-danger me-3" onClick={ descargarPdf } > <i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
            </div>
        </div>
    </div>
  )
}
