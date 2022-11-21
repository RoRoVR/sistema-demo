import { generarFechaDMA, generarFechaHoraAMD } from "../../../helpers/dateConfig";
import { upperCamelCase } from "../../../helpers/textConfig";
import logo from '../../../assets/svg/logo-letra.svg';
import { useRef } from "react";
import { pdfReporteGastos } from "../pdf/pdfReporteGastos";


export const ReporteGastos = ({setReporteGastos, registroGastos, primerDia, ultimoDia}) => {
    const table = useRef();

    const descargarReporteGastos = () => {
        const id = table.current.id;
        const datos = {
            fechaInicial: generarFechaDMA(primerDia),
            fechaFinal: generarFechaDMA(ultimoDia)
        }
        pdfReporteGastos(id, datos);
    }

    const generarTotalGastos = () => {
        let total = 0;
        registroGastos.forEach(r => {
            total += r.monto;            
        });

        return total;
    }

  return (
    <div className='window' >
        <div className="window-container">
            <div className="window-head">
                <span>REPORTE DE GASTOS DE {generarFechaDMA(primerDia)} HASTA {generarFechaDMA(ultimoDia)}</span>
                <div className="btn-exit" onClick={ () => { setReporteGastos(s => !s) } } >
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
                            <p> <span className="fw-bold"> Desde: </span> {generarFechaDMA(primerDia)}</p>
                            <p> <span className="fw-bold"> Hasta: </span> {generarFechaDMA(ultimoDia)}</p>
                        </div>
                    </div>
                </div>
                <table className="table table-hover" id="tableReporteGastos" ref={table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>FECHA</th>
                            <th>USUARIO</th>
                            <th>TIPO DE GASTO</th>
                            <th>DETALLE</th>
                            <th>MONTO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registroGastos.map((r, index) => (
                        <tr key={index} >
                            <td>{index+1}</td>
                            <td>{generarFechaHoraAMD(r.fecha)}</td>
                            <td>{r.usuario.nombre}</td>
                            <td>{upperCamelCase(r.tipoGasto)}</td>
                            <td>{r.detalle}</td>
                            <td>{r.monto} Bs.</td>
                        </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan='5' className="text-end" >TOTAL</th>
                            <th>{generarTotalGastos()}Bs.</th>
                        </tr>
                    </tfoot>
                </table>

            </div>
            <div className="window-footer">
                <div className="btn btn-danger" onClick={descargarReporteGastos} > <i className="bi bi-file-earmark-pdf-fill"></i> Descargar </div>
            </div>
        </div>
    </div>
  )
}
