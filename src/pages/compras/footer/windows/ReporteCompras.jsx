import { useSelector } from "react-redux";
import { generarFechaAMD, generarFechaDMA } from "../../../../helpers/dateConfig";
import logo from '../../../../assets/svg/logo-letra.svg';
import { useRef } from "react";
import { pdfReporteCompras } from "../../pdf/pdfReporteCompras";


export const ReporteCompras = ({ setReporteCompras, valuesObj }) => {
    const { compras } = useSelector(s => s.compras);
    const table = useRef();


    const showCompras = compras.filter( c =>{
        if( c.proveedor.toLocaleLowerCase().includes(valuesObj.proveedor.toLocaleLowerCase()) ){
          return c;
        }});
    showCompras.reverse();

    const calcularSaldo = (c) => {
        let saldo = 0;
        c.saldoPagos.forEach(p => {
            saldo += p.monto           
        });
        return c.total - saldo;
    }
    const calcularTotales = () => {
        let sumPagado = 0;
        let sumRestante = 0;
        let sumTotal = 0;

        showCompras.forEach( c => {
            const saldo = calcularSaldo(c);
            sumPagado += c.total - saldo;
            sumRestante += saldo;
            sumTotal += c.total;
        });
        return{ sumPagado, sumRestante, sumTotal }
    }
    const totales = calcularTotales();

    const descargarReporteCompras = () => {
        const id = table.current.id;
        const datos = {
            fechaInicial: generarFechaDMA(valuesObj.fechaInicio),
            fechaFinal: generarFechaDMA(valuesObj.fechaFinal)
        }
        pdfReporteCompras(id, datos);
      }

  return (
    <div className="window">
        <div className="window-container">
            <div className="window-head">
                <span>REPORTE DE COMPRAS</span>
                <div className="btn-exit" onClick={ () => { setReporteCompras(s => !s) } } >
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
                            <p> <span className="fw-bold"> Desde: </span> { generarFechaDMA(valuesObj.fechaInicio) }</p>
                            <p> <span className="fw-bold"> Hasta: </span> { generarFechaDMA(valuesObj.fechaFinal) }</p>
                        </div>
                        </div>
                </div>


                <table className="table" id="tableReporteCompras" ref={table} >
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Proveedor</th>
                            <th>Items</th>
                            <th>Pagado</th>
                            <th>Restante</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showCompras.map(c => (
                            <tr key={c.id} >
                                <td> { generarFechaDMA(generarFechaAMD(c.fecha)) } </td>
                                <td> { c.proveedor } </td>
                                <td> { c.items.length } </td>
                                <td> { c.total - calcularSaldo(c) } Bs. </td>
                                <td> { calcularSaldo(c) } Bs. </td>
                                <td> { c.total } Bs. </td>
                            </tr>
                            ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan='3' >Total</th>
                            <th>{ totales.sumPagado } Bs.</th>
                            <th>{ totales.sumRestante } Bs.</th>
                            <th>{ totales.sumTotal } Bs.</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="window-footer">
                <div className="btn btn-danger" onClick={descargarReporteCompras} ><i className="bi bi-file-earmark-pdf-fill"></i> Descargar</div>
            </div>
        </div>
    </div>
  )
}
