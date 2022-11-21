import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { upperCamelCase } from "../../../helpers/textConfig";
import { seleccionarItem } from "../slices/ventasSlice";


export const ItemProducto = ({ item, listItems, listAdd, listDelete }) => {
  const { configuracion } = useSelector( s => s.ventas );
  const [activePrecios, setActivePrecios] = useState(false);
  const dispatch = useDispatch();

    
  const generarPrecio = () => {
    let precio = '';
    item.preciosVenta.forEach(p => {
      if( p.tipo == configuracion.precioBase ) precio = p.precio ;  
    })
    return precio;
  }

  const agregarItem = () => {
    
    if( item.select ){ //QUITAMOS EL ITEM
      let newItems = listItems.map(i => (i.id === item.id) ? {...i, select:false}:{...i});
      dispatch( seleccionarItem( newItems ) );
      listDelete('', item.id); // Quitamos el item por su ID

    }else{ //AGREGAMOS EL ITEM
      let newItems = listItems.map(i => (i.id === item.id) ? {...i, select:true}:{...i});
      const { cantidad, categoria, costo, id, marca, medida, modelo, nombre, preciosVenta, procedencia } = item;
      dispatch( seleccionarItem( newItems ) );
      listAdd({ cantidad, cantVenta: 1, precioVenta: generarPrecio(preciosVenta), preciosVenta, categoria, costo, id, marca, medida, modelo, nombre, procedencia });
    }
  }

  return (
    <div className='col-4 p-2' >
      <div className='card-items border rounded' >
        <div className="card-item-body">
          <div className="card-item-img">
            <span className="card-item-img-cantidad" >{item.cantidad} { item.medida.toUpperCase()}</span>
            <span className="card-item-img-marca" >{item.modelo.toUpperCase()}</span>
            {!item.habilitado&&
              <div className="disabled font-monospace">DESHABILITADO</div>
            }
            <img src={item.imgUrl} />
          </div>
          <div className="card-item-title">
            {item.nombre}
          </div>
          <div className="card-item-marca">
            <p className="mb-0 px-3 text-center fw-bold ">{item.marca.toUpperCase()}</p>
            <p className="mb-0 px-3 text-center">{ upperCamelCase(item.procedencia)} </p>
          </div>
          <div 
          className={activePrecios ? "card-item-precios active" : "card-item-precios" }
          onClick={() => { setActivePrecios(s => !s) }}
          >
            <p className="mb-0 bg-success text-white text-center fw-bold "> PRECIOS </p>
            {item.preciosVenta.map( (p, index) => (
              <p key={index} className="m-0 px-3"><span className="fw-bold" >{ p.tipo.toUpperCase() }: </span> {p.precio}Bs. </p>
            ))}
          </div>
        </div>
        <div className="card-item-footer border-top container px-3">
          <div className="row">
            <span className='fw-bold col-7 d-flex ' >P. BASE: { generarPrecio() } Bs.</span>
            <div className="form-check form-switch col-5 d-flex justify-content-end" >
              {/* <div className="btn btn-primary btn-sm " onClick={agregarItem} > boton </div> */}
              <input 
              className="form-check-input" 
              type='checkbox' 
              id={item.id} 
              checked={item.select} 
              onChange={agregarItem} 
              disabled={ !item.habilitado } />
            </div>
          </div>
        </div>    
      </div>
    </div>
  )
}
