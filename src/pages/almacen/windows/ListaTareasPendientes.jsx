import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TareaPendiente } from '../components/TareaPendiente';
import { obtenerTareasPendientesAlmecen } from '../slices/almacenThunk';

export const ListaTareasPendientes = ({ listaTareasPendientes, setListaTareasPendientes }) => {
    const { tareasPendientes } = useSelector( s => s.almacen );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch( obtenerTareasPendientesAlmecen() );    
    }, []);

  return (
    <div className="window" >
    <div className="window-container">
        <div className="window-head">
            <span> Lista de tareas pendientes </span>
            <div className="btn-exit" onClick={ () => { setListaTareasPendientes(!listaTareasPendientes) } } >
                <i className="bi bi-x"></i>
            </div>
        </div>

        <div className="window-body">

            <div className="container-fluid">
                <div className="row">
                    {tareasPendientes.length === 0 &&
                    <span className='text-muted text-center ' >No existen tareas pendientes actualmente.</span>
                    }
                    {tareasPendientes.map(compra => {
                    if( compra.estado === "loading" ){
                        return(
                            <div key={compra.id} className='col-4' >
                                <TareaPendiente compra={compra} />
                            </div>)
                    }})}
                </div>
            </div>


        </div>

    </div>


</div>
  )
}
