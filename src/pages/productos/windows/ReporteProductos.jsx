import { cuatroDecimales } from "../../../helpers/numConfig";


export const ReporteProductos = ({reporte, setReporte, items}) => {

    const generarTotales = () => {
        let totales = {
            costo: 0,
            cantidad: 0
        };
        items.forEach((i) => {
            totales.costo += (i.costo * i.cantidad );
            totales.cantidad += i.cantidad;
        });
        return totales;
    }

  return (
    <div className='window' >
        <div className="window-container">
            <div className="window-head">
                <span>REPORTE DE PRODUCTOS</span>
                <div className="btn-exit" onClick={ () => { setReporte(!reporte) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body">

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center" >ITEM</th>
                            <th scope="col" className="text-center" >MODELO</th>
                            <th scope="col" className="text-center" >NOMBRE</th>
                            <th scope="col" className="text-center" >CANTIDAD</th>
                            <th scope="col" className="text-center" >MEDIDA</th>
                            <th scope="col" className="text-center" >MARCA</th>
                            <th scope="col" className="text-center" >COSTO</th>
                            <th scope="col" className="text-center" >TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((i, index) => (
                            <tr key={index} >
                                <th scope="row">{ index + 1 }</th>
                                <td>{i.modelo}</td>
                                <td>{i.nombre}</td>
                                <td>{i.cantidad}</td>
                                <td>{i.medida.toUpperCase()}</td>
                                <td>{i.marca.toUpperCase()}</td>
                                <td className="text-end" >{i.costo} Bs.</td>
                                <td className="text-end">{cuatroDecimales(i.costo * i.cantidad) } Bs.</td>                            
                            </tr>
                        ))}

                        <tr className="table-active" >
                            <th scope="col" colSpan='3' >TOTAL</th>
                            <td scope="col" colSpan='4'>{generarTotales().cantidad}</td>
                            <td scope="col" className="text-end">{ cuatroDecimales(generarTotales().costo)} Bs.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}
