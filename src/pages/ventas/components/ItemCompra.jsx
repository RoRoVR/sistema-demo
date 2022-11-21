import { useSelector } from "react-redux";
import { unDecimal } from "../../../helpers/numConfig"

export const ItemCompra = ({compra, index, quitarItem, handleInputChange}) => {
  const {configuracion} = useSelector(s => s.ventas)

  const generarPrecioBase = () => {
    let p = compra.preciosVenta.find( p => p.tipo === configuracion.precioBase );
    return p.precio;
  }
  return (
    <tr>
      <th scope="row" > {index + 1} </th>
      <td> {compra.nombre} </td>
      <td className="col-2">
        <input 
        type='number' 
        className="form-control form-control-sm"
        name={`cantVenta_${index}`}
        onChange={handleInputChange}
        value = { compra.cantVenta }
        />
      </td>

      {(isNaN( parseInt(compra.cantVenta) ))?
        <td>0</td>
        :
        <td> { unDecimal(generarPrecioBase() * parseInt(compra.cantVenta))} </td>
      }
      <td>
        <div className="btn-icon-danger" onClick={() => { quitarItem(compra) }} >
          <i className="bi bi-trash-fill"></i>
        </div>
      </td>
    </tr>
  )
}
