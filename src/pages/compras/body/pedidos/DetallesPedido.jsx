import { useRef } from "react"
import { generarFechaAMD } from "../../../../helpers/dateConfig"
import { pdfDetallesPedido } from "../../pdf/pdfDetallesPedido";

export const DetallesPedido = ({setDetallesPedido, detallesPedido, pedido}) => {

    const refTableDetallePedido = useRef();
    const descargarDetallePedido = () => {

        const id = refTableDetallePedido.current.id;
        let items = [];
        const datos = {
            proveedor: pedido.proveedor,
            fecha: generarFechaAMD( pedido.fecha )
        }
        // for (let i = 0; i < pedido.items; i++) {
        //     items.  
        // }

        pdfDetallesPedido( id, datos );
    }
    
  return (
    <div className='window' >
        <div className="window-container-md">
            <div className="window-head">
                <span>PEDIDO {generarFechaAMD(pedido.fecha)} A {pedido.proveedor}</span>
                <div className="btn-exit" onClick={ () => { setDetallesPedido(!detallesPedido) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">
                <table className='table' id="tableDetallePedido" ref={refTableDetallePedido} >
                    <thead >
                        <tr>
                            <th scope='col' >Nº</th>
                            <th scope='col' >Nombre</th>
                            <th scope='col' >Marca</th>
                            <th scope='col' >Modelo</th>
                            <th scope='col' >Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.items.map((i, index) => (
                            <tr key={i.id} >
                                <th scope="row">{index+1}</th>
                                <td>{i.nombre}</td>
                                <td>{i.marca}</td>
                                <td>{i.modelo}</td>
                                <td>{i.cantidad}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="window-footer">
                <div className="btn btn-danger"  onClick={ descargarDetallePedido }> <i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
            </div>
        </div>
    </div>
  )
}
