import { useSelector } from "react-redux";
import { LoadingAplication } from "../components/LoadingAplication";
import { ReporteProductos } from "../windows/ReporteProductos";
import { ProductosItem } from "./items/ProductosItem";

export const Body = ({buscar, marca, categoria, reporte, estado, setReporte}) => {
  const { cargandoAplicacion, items } = useSelector( s => s.productos );

  const showItems = items.filter(i => {
    if( i.nombre.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase()) ||
        i.modelo.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase()) ||
        i.categoria.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase()) ||
        i.marca.toLocaleLowerCase().includes(buscar.trim().toLocaleLowerCase())){
      if (i.marca.toLocaleLowerCase().includes(marca.toLocaleLowerCase()) && i.categoria.toLocaleLowerCase().includes(categoria.toLocaleLowerCase()) ){
        if( estado === "success"){
          return ((i.cantidad > i.cantidadMinima * 2.5 )&& i)
        }else if( estado === "warning"){
          return ((i.cantidad > i.cantidadMinima && i.cantidad <= i.cantidadMinima * 2.5 )&& i)
        } else if( estado === "danger" ){
          return ((i.cantidad <= i.cantidadMinima)&& i)
        }else{
          return i
        }
      }
    }
  } );

  return (
    <div className='aplication-body' >
      {/* VENTANAS */}
      {reporte&&
        <ReporteProductos reporte={reporte} setReporte={ setReporte } items={ showItems }  />
      }
      
      <div className="container-fluid">
        {/* ENCABEZADO */}
        <div className="row bg-primary px-1">
          <div className="col-2 text-white text-center ">Imagen</div>
          <div className="col-2 text-white text-center ">Modelo</div>
          <div className="col-1 text-white text-center ">Marcas</div>
          <div className="col-5 text-white text-center ">Nombre</div>
          <div className="col-1 text-white text-center ">Cantidad</div>
          <div className="col-1 text-white text-center ">Mas</div>
        </div>
      </div>

      <div className="aplication-body-container">
        <div className="container-fluid pb-4">
        { cargandoAplicacion && <LoadingAplication/>}

        {showItems.map(i => (
          <ProductosItem 
          key={i.id}
          item = {i}
           />
        ))
        }
        </div>
      </div>
 
    </div>
  )
}
