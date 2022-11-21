import { useSelector } from "react-redux";
import { unDecimal } from "../../../helpers/numConfig";

export const ItemListCompras = ({c, index, handleInputChange, quitarItem}) => {
    const { items, configuracion } = useSelector(s => s.ventas);
    const itemDB = items.find(item => {
        return item.id === c.id
    });
    let newCantidad = itemDB.cantidad;

  const generarPrecioBase = () => {
    let p = c.preciosVenta.find( p => p.tipo === configuracion.precioBase );   

    return p.precio;
  }
  return (
    <tr key={index} >
        <th scope="row" > {index + 1} </th>
        <td> { c.modelo } </td>
        <td> { c.nombre } </td>
        <td> { c.marca.toUpperCase() } </td>
        <td> { c.medida.toUpperCase() } </td>
        <td className="col-1 position-relative">
            {( newCantidad - c.cantVenta < 0)&&
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                Límite superado
                <span className="visually-hidden">unread messages</span>
            </span>
            }
            <input 
            type='number' 
            className="form-control form-control-sm"
            name={`cantVenta_${index}`}
            onChange={handleInputChange}
            value = { c.cantVenta }
            />
        </td>
        <td>
            {generarPrecioBase()}
        </td>
        <td className="col-1">
            <input 
            type='number' 
            className="form-control form-control-sm"
            name={`precioVenta_${index}`}
            onChange={handleInputChange}
            value = { c.precioVenta }
            />
        </td>
        <td> { unDecimal( c.cantVenta * c.precioVenta ) } </td>
        <td>
            <div className="btn-icon-danger" onClick={() => {quitarItem(c)}}><i className="bi bi-trash-fill"></i></div>
        </td>
    </tr>
  )
}
