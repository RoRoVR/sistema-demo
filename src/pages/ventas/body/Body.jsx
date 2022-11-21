import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormList } from "../../../hooks/useFormList";
import { LoadingAplication } from "../../productos/components/LoadingAplication";
import { ItemCompra } from "../components/ItemCompra";
import { ItemProducto } from "../components/ItemProducto";
import { seleccionarItem } from "../slices/ventasSlice";
import { DetallesVenta } from "../windows/DetallesVenta";
import { NuevaVenta } from "../windows/NuevaVenta";


export const Body = ({buscar, marca, categoria, items}) => {

  const dispatch = useDispatch();
  const [datosCompra, setDatosCompra] = useState({});
  const [detallesVenta, setDetallesVenta] = useState(false);
  const [nuevaVenta, setNuevaVenta] = useState(false);
  const { cargandoAplicacion, configuracion } = useSelector( s => s.ventas );
  const listCompras = items.filter(i => {
    if(i.select && i.habilitado) return i;
  });
  const [formValues, handleInputChange,listAdd,listDelete, reset, handleInputChangeManual] = useFormList([]);

  //ITEMS FILTRADOS
  const showItems = items.filter(i => {
    if( i.nombre.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase()) ||
        i.modelo.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase()) ||
        i.categoria.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase()) ||
        i.marca.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase())){
      if (i.marca.toLocaleLowerCase().includes(marca.toLocaleLowerCase()) && i.categoria.toLocaleLowerCase().includes(categoria.toLocaleLowerCase()) ){
        return i
      }}
    });

    const generarPrecio = (preciosVenta) => {
      let precio = '';
      preciosVenta.forEach(p => {
        if( p.tipo === configuracion.precioBase ) {
          precio = p.precio}  
      })
      return precio;
    }

    const quitarItem = (item) => {  
      if( item.id ){ //SI YA SE HABIA AGREGADO
        let newItems = items.map(i => (i.id === item.id) ? {...i, select:false}:{...i});
        dispatch( seleccionarItem( newItems ) );
        listDelete('', item.id); // Quitamos el item por su ID
      }
    }
  
  return (
    <>
    {/* VENTANAS */}
    {nuevaVenta&&
      <NuevaVenta 
      setNuevaVenta={setNuevaVenta} 
      listCompras={formValues}
      listComprasReset={reset}
      handleInputChange={handleInputChange}
      handleInputChangeManual={handleInputChangeManual}
      quitarItem={quitarItem}
      setDatosCompra={setDatosCompra}
      setDetallesVenta={setDetallesVenta}
      />
    }
    {detallesVenta&&
    <DetallesVenta
    setDetallesVenta={ setDetallesVenta }
    venta={ datosCompra }
    />
    }

    {cargandoAplicacion && items.length === 0 ?
    <div className="aplication-body"  >
      <div className="aplication-body-container">
        <LoadingAplication/>
      </div>
    </div>
    :
    <div className="aplication-body d-flex"  >
      <div className="aplication-body-container col-7">  
        <div className="container-fluid">
          <div className="row">
            {showItems.map((i)=>{
              return(
                <ItemProducto key={i.id} item = {i} listItems = {items} listAdd={listAdd} listDelete={listDelete} generarPrecio={generarPrecio} />
              )
              })
            } 
          </div>
        </div> 
          
        </div>
        <div className="aplication-body-container col-5 border-start p-3">
          {(listCompras.length === 0 )?
            <p className="text-center" > Selecciona algun Item... </p>
            :
            <>
              <h4 className="text-center" >Items agregados</h4>

              <table className="table table-hover" >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Cant</th>
                    <th scope="col">Precio</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider" >
                  {formValues.map((c, index) => (
                    <ItemCompra key={index} compra={c} index={index} quitarItem={quitarItem} generarPrecio ={generarPrecio} handleInputChange={handleInputChange} />
                    ))
                  }
                </tbody>
              </table>
              <div className="btn btn-primary" onClick={() => { setNuevaVenta(!nuevaVenta) }}> Registrar venta </div>
            </>
          }          
        </div>
    </div>

      }
      </>
    )
  }
