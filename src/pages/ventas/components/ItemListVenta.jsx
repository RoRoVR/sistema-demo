import { useState } from "react"
import { generarFechaHoraAMD } from "../../../helpers/dateConfig"
import { cuatroDecimales } from "../../../helpers/numConfig";
import { DetallesVenta } from "../windows/DetallesVenta";

export const ItemListVenta = ({venta}) => {
    const [detallesVenta, setDetallesVenta] = useState(false);
    const generarSaldo = (pagos) => {
        let saldo = 0;
        pagos.forEach(p => {
            saldo += parseFloat(p.monto);            
        });
        return saldo;
    }
  return (
    <>
        {/* VENTANAS */}
        {detallesVenta&&
            <DetallesVenta setDetallesVenta={ setDetallesVenta } venta={venta} />
        }

        <div className="row border rounded mb-2 py-1">
            
            <div className="col-1">
                <p className="m-0" > { venta.numero } </p>
            </div>
            <div className="col-2">
                <p className="m-0" > { generarFechaHoraAMD(venta.fecha)} </p>
            </div>
            <div className="col-3">
                <p className="m-0" > { venta.cliente.nombre } </p>
            </div>
            <div className="col-2">
                <p className="m-0" > { venta.tipoPago.toUpperCase() }</p>
            </div>
            <div className="col-1">
                <p className="m-0" > { generarSaldo(venta.pagos) } Bs. </p>
            </div>
            <div className="col-1">
                <p className="m-0" > { venta.total - generarSaldo(venta.pagos) } Bs. </p>
            </div>
            <div className="col-1">
                <p className="m-0" > { venta.total } Bs. </p>
            </div>
            <div className="col-1">
                <div className="btn-icon-white" onClick={() => { setDetallesVenta(!detallesVenta) }} >
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
        </div>
    </>
  )
}
