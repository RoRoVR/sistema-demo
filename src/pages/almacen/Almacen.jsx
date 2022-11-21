import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { Body } from './body/Body';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { obtenerColeccionProductosFirebase } from '../productos/slices/productosThunk';
import { obtenerColeccionComprasProveedores } from '../compras/slices/comprasThunk';

export const Almacen = () => {

  const dispatch = useDispatch(); 
  const busqueda = useFormik({
    initialValues: {
      buscar:'',
      marca:'',
      categoria:'',
      estado:''
    }
  });
  useEffect(() => {
    dispatch( obtenerColeccionProductosFirebase() );
    dispatch( obtenerColeccionComprasProveedores() ); 
  }, [])
  


  return (
    <div>
      <Header
      buscar={busqueda.values.buscar}
      marca={busqueda.values.marca}
      categoria={busqueda.values.categoria}
      handleChange={ busqueda.handleChange }
      estado={busqueda.values.estado}
      />
      <Body
      buscar={busqueda.values.buscar}
      marca={busqueda.values.marca}
      categoria={busqueda.values.categoria}
      estado={busqueda.values.estado}
      />
      <Footer/>
    </div>
  )
}
