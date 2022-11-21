import { LoadingAplication } from '../../../components/loading-aplication/LoadingAplication';
import { useSelector } from 'react-redux';
import { ItemAlmacen } from '../components/ItemAlmacen';

export const Body = ({buscar, marca, categoria, estado}) => {

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
    <div className='aplication-body'>
      
        <div className="container-fluid">
          {/* ENCABEZADO */}
          <div className="row bg-primary px-1">
            <div className="col-2 text-white text-center ">Imagen</div>
            <div className="col-2 text-white text-center ">Modelo</div>
            <div className="col-1 text-white text-center ">Marcas</div>
            <div className="col-5 text-white text-center ">Nombre</div>
            <div className="col-1 text-white text-center ">Cantidad</div>
            <div className="col-1 text-white text-center ">Estado</div>
          </div>
        </div>

      <div className="aplication-body-container">
      { cargandoAplicacion&& <LoadingAplication/>}
        <div className="container-fluid">
          {showItems.map( i => {
            return(
              <ItemAlmacen key={i.id} item={i} />
            )})

          }
        </div>



      </div>
    </div>
  )
}
