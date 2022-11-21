import { useForm } from '../../../hooks/useForm';
import { useSelector } from 'react-redux';

export const ProductosCotizaciones = ({productosItems, setProductosItems, listItems, listDelete, setListItems, listAdd}) => {
    const [valuesObj, handleInputChangeObj]= useForm({buscar:''});
    const { configuracion } = useSelector(s => s.ventas);

    const showItems = listItems.filter(i => {
        if( i.nombre.toLowerCase().includes(valuesObj.buscar.trim().toLowerCase()) ||
            i.marca.toLowerCase().includes(valuesObj.buscar.trim().toLowerCase()) ||
            i.modelo.toLowerCase().includes(valuesObj.buscar.trim().toLowerCase())){
            return i
        }
      } );

      const generarPrecio = (preciosVenta) => {
        let precio = '';
        preciosVenta.forEach(p => {
          if( p.tipo == configuracion.precioBase ) precio = p.precio ;  
        })
        return precio;
      }
    
      const agregarItem = (codigo) => {
        // codigo = id
        let newList = [...listItems];
        let itemSelect = {}
        
        newList.forEach( i => {
            if( i.id === codigo ){
                i.select = true;
                itemSelect = {...i};
                return ;
            }
        });
        const {nombre, marca, modelo, id} = itemSelect;
        let precio = generarPrecio(itemSelect.preciosVenta);
        setListItems(newList);
        listAdd({nombre, marca, modelo, cantidad: 1, id, precio });
    }

    const eliminarItem = (codigo) => {
        let newList = [...listItems];

        newList.forEach( i => {
            if( i.id === codigo ){
                i.select = false;
                return ;
            }
        });
        setListItems(newList);
        listDelete( '' , codigo);
    }



  return (
    <div className='window'>
        <div className="window-container">
            <div className="window-head">
                <span>ITEMS</span>
                <div className="btn-exit" onClick={ () => { setProductosItems(!productosItems) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className='input-search mx-3 my-2 me-auto' >
            <input 
            type="search" 
            placeholder='Buscar...'
            id='buscar'
            name='buscar'
            onChange={ handleInputChangeObj }
            value={ valuesObj.buscar }
            autoComplete='off'             
            />
                <i className="bi bi-search" style={{left: '15px'}} ></i>
            </div>

            <div className="window-body">

                <div className="list-group container-fluid">
                    {showItems.map((i, index)=> (
                    <div key={i.id} className="list-group-item">
                        <div className='row' >
                            <div className="col-2 d-flex justify-content-center">
                                <img src={i.imgUrl} style={{height:'80px'}} />
                            </div>
                            <div className="col-4 d-flex justify-content-center align-items-center">{i.nombre}</div>
                            <div className="col-3 d-flex justify-content-center align-items-center">{i.marca}</div>
                            <div className="col-2 d-flex justify-content-center align-items-center">{i.modelo}</div>
                            <div className="col d-flex justify-content-center align-items-center">
                                {i.select ?
                                    <i 
                                    className="bi bi-check-circle-fill" style={{ color:'green', cursor:'pointer' }}
                                    onClick={()=>{eliminarItem(i.id)}}
                                    ></i>
                                    :
                                    <i 
                                    className="bi bi-check-circle" 
                                    style={{ color:'#989898', cursor:'pointer' }}
                                    onClick={()=>{agregarItem(i.id)}} 
                                    ></i>
                                }
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                


            </div>

            <div className="window-footer">
                <div className="btn btn-primary" onClick={ () => { setProductosItems(!productosItems) } } >
                    Aceptar
                </div>
            </div>
        </div>
    </div>
  )
}
