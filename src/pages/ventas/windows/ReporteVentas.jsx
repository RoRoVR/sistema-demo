import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { generarFechaAMD } from "../../../helpers/dateConfig";
import { cuatroDecimales } from "../../../helpers/numConfig";
import { upperCamelCase } from "../../../helpers/textConfig";

export const ReporteVentas = ( {setReporteVentas, tipoPago } ) => {

  const { registroVentas, busquedaCliente } = useSelector(s => s.ventas);
  const { marcas } = useSelector(s => s.productos)
  const showRegistroVentas = registroVentas.filter(i => {
    if(i.tipoPago.toLowerCase().includes(tipoPago)){
        if(busquedaCliente.cliente.codigo){
            if( i.idCliente === busquedaCliente.cliente.codigo ){
                return i;
            }
        }
        else{
            return i;
        }
    }});
    const busqueda = useFormik({
      initialValues: {
        buscar:'',
        marca:'',
      }
    });
 
    const [registro, setRegistro] = useState({
    reporteItems:[],
    totalVenta:0,
    totalCosto:0,
    totalUtilidad:0
  });
  const { reporteItems } = registro;
  const showReporteItems = reporteItems.filter(i => {
    if( i.item.nombre.toLocaleLowerCase().includes(busqueda.values.buscar.trim().toLocaleLowerCase()) ||
        i.item.marca.toLocaleLowerCase().includes(busqueda.values.buscar.trim().toLocaleLowerCase())){
      if (i.item.marca.toLocaleLowerCase().includes(busqueda.values.marca.toLocaleLowerCase())){
        return i
      }}
    });

  const generarReportesPorItem = () => {
    let reporteItems = [];
    // let totalVenta = 0;
    // let totalCosto = 0;
    // let totalUtilidad = 0;
    showRegistroVentas.forEach(r => {
      r.items.forEach( i => {
        reporteItems.unshift({item: i, numero: r.numero, fecha: r.fecha, cliente: r.cliente,vendedor: r.vendedor , precioBase: r.precioBase});
        // totalVenta += parseFloat(i.cantVenta * i.precioVenta);
        // totalCosto += parseFloat(i.cantVenta * i.costo);
        // totalUtilidad += parseFloat((i.cantVenta * i.precioVenta) - (i.cantVenta * i.costo));
      });    
    });
    setRegistro( {reporteItems} );
  }

  const generarTotales = (reporte) => {
    // console.log(reporte);
    let totalVenta = 0;
    let totalCosto = 0;
    let totalUtilidad = 0;
    if(reporte.length > 0){
      reporte.forEach(r => {
        totalVenta += parseFloat(r.item.cantVenta * r.item.precioVenta);
        totalCosto += parseFloat(r.item.cantVenta * r.item.costo);
        totalUtilidad += parseFloat((r.item.cantVenta * r.item.precioVenta) - (r.item.cantVenta * r.item.costo));      
      });
    }

    return({ totalVenta, totalCosto, totalUtilidad });
  }

  useEffect(() => {
    generarReportesPorItem();
  }, [])
  

  return (
    <div className='window'>
        <div className="window-container">
            <div className="window-head">
                <span>REGISTRO DE VENTAS</span>
                <div className="btn-exit" onClick={ () => { setReporteVentas(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">

              <table className="table table-hover table-striped" >
                <thead>
                  <tr>
                    <th scope="col">C/V</th>
                    <th scope="col">FECHA</th>
                    <th scope="col">PRODUCTO</th>
                    <th scope="col">COD.</th>
                    <th scope="col">MARCA</th>
                    <th scope="col">CLIENTE</th>
                    <th scope="col">CANT.</th>
                    <th scope="col">P/U</th>
                    <th scope="col">VENTA</th>
                    <th scope="col">TIPO</th>
                    <th scope="col">COMPRA</th>
                    <th scope="col">COSTO</th>
                    <th scope="col">UTIL.</th>
                    <th scope="col">VENDEDOR</th>
                  </tr>
                </thead>

                <tbody>
                  {showReporteItems.map( (i, index) => (
                    <tr key={index} >
                      <td> {i.numero} </td>
                      <td> { generarFechaAMD(i.fecha)} </td>
                      <td> {i.item.nombre} </td>
                      <td> {i.item.modelo} </td>
                      <td> {i.item.marca ? i.item.marca.toUpperCase():''} </td>
                      <td> {i.cliente.nombre} </td>
                      <td> {i.item.cantVenta} </td>
                      <td> {i.item.precioVenta}</td>
                      <td> {cuatroDecimales(i.item.cantVenta * i.item.precioVenta)}</td>
                      <td> {i.precioBase? i.precioBase.toUpperCase():''}</td>
                      <td> {i.item.costo}</td>
                      <td> {cuatroDecimales(i.item.cantVenta * i.item.costo)}</td>
                      <td> {cuatroDecimales((i.item.cantVenta * i.item.precioVenta) - (i.item.cantVenta * i.item.costo))}</td>
                      <td> {i.vendedor.nombre} </td>
                    </tr>
                  ))}

                  <tr>
                    <th colSpan='9' className="text-end" >{cuatroDecimales(generarTotales(showReporteItems).totalVenta)} Bs.</th>
                    <th colSpan='3' className="text-end" >{cuatroDecimales(generarTotales(showReporteItems).totalCosto)} Bs.</th>
                    <th colSpan='2' className="text-start" >{cuatroDecimales(generarTotales(showReporteItems).totalUtilidad)} Bs.</th>
                  </tr>
                </tbody>
              </table>

            </div>
            <div className="window-footer">
              <div className="container-fluid">
                <div className="row">

                  <div className='input-search col-3 me-2' >
                    <input 
                    type="search" 
                    placeholder='Buscar...'
                    id='buscar'
                    name='buscar'
                    onChange={ busqueda.handleChange }
                    value={ busqueda.values.buscar }
                    autoComplete='off'             
                    />
                    <i className="bi bi-search"></i>
                  </div>

                  <div className="col-2">
                    <select 
                    className="form-select form-select-sm" 
                    name="marca" 
                    id="marca"
                    onChange={ busqueda.handleChange }
                    value={ busqueda.values.marca }
                    >
                      <option value="">Todas las marcas</option>
                      {
                        marcas.map(m => (
                          <option key={m.id} value= {m.nombre} > { upperCamelCase( m.nombre ) } </option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}
