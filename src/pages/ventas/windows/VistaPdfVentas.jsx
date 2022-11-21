import { generarFechaDMA, generarFechaHoraAMD } from "../../../helpers/dateConfig";
import { upperCamelCase } from "../../../helpers/textConfig";
import logo from '../../../assets/svg/logo-letra.svg';
import { useRef } from "react";
import { pdfVistaPdfVentas } from "../pdf/pdfVistaPdfVentas";

export const VistaPdfVentas = ({setVistaPdfVntas, showRegistroVentas, primerDia, ultimoDia}) => {

  const table = useRef();

  const generarSaldo = (pagos) => {
    let saldo = 0;
    pagos.forEach(p => {
        saldo += parseFloat(p.monto);            
    });
    return saldo;
  }
  const generarTotal = () => {
    let total = 0;
    let pagado = 0;
    let restante = 0;
    showRegistroVentas.forEach(v => {
      pagado += generarSaldo(v.pagos)
      restante += v.total - generarSaldo(v.pagos)
      total += v.total
    });

    return {total, pagado, restante}
  }

  const descargarVistaPdfVentas = () => {
    const id = table.current.id;
    const datos = {
        fechaInicial: generarFechaDMA(primerDia),
        fechaFinal: generarFechaDMA(ultimoDia)
    }
    pdfVistaPdfVentas(id, datos);
  }

  return (
    <div className='window'>
      <div className="window-container">
        <div className="window-head">
          <span>VISTA PDF DE VENTAS</span>
          <div className="btn-exit" onClick={ () => {setVistaPdfVntas(s => !s)} } >
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
                <p> <span className="fw-bold"> Desde: </span> { generarFechaDMA(primerDia) }</p>
                <p> <span className="fw-bold"> Hasta: </span> { generarFechaDMA(ultimoDia) }</p>
              </div>
            </div>

            <table className="table table-hover" id="tableVistaPdfVentas" ref={table} >
              <thead>
                <tr>
                  <th>COD</th>
                  <th>FECHA</th>
                  <th>CLIENTE</th>
                  <th>PAGO</th>
                  <th>PAGADO</th>
                  <th>RESTANTE</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>
              <tbody>
                {showRegistroVentas.map( (venta, index) => (
                  <tr key={index} >
                    <td>{ venta.numero }</td>
                    <td>{ generarFechaHoraAMD(venta.fecha) }</td>
                    <td>{ venta.cliente.nombre }</td>
                    <td>{ venta.tipoPago.toUpperCase() }</td>
                    <td>{ generarSaldo(venta.pagos) } Bs.</td>
                    <td>{ venta.total - generarSaldo(venta.pagos) } Bs.</td>
                    <td>{ venta.total } Bs.</td>
                  </tr>
                ))}                
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan='4' >TOTAL</th>
                  <th>{generarTotal().pagado}Bs.</th>
                  <th>{generarTotal().restante}Bs.</th>
                  <th>{generarTotal().total}Bs.</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="window-footer">
          <div className="btn btn-danger" onClick={ descargarVistaPdfVentas } ><i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
        </div>
      </div>
    </div>
  )
}
