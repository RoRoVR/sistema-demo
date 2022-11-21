import { useSelector } from "react-redux";

export const ListaProveedoresMin = ({ listaProveedoresMin, setListaProveedoresMin, valueManual }) => {  

    const { proveedores } = useSelector(s => s.compras);

    const llenarProveedor = (prov) => {
      valueManual({proveedor:prov});
      setTimeout(()=>{ setListaProveedoresMin(!listaProveedoresMin) },100);   
    }

  return (
    <div className="window">
        
        <div className="window-container-sm">
            <div className="window-head">
                <span>LISTA DE PROVEEDORES</span>
                <div className="btn-exit" onClick={ () => { setListaProveedoresMin(!listaProveedoresMin) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <div className="list-group mb-2">

                  {proveedores.map(p => (
                    <button 
                    key={p.id} 
                    type="button" 
                    className="list-group-item list-group-item-action"
                    onClick={()=>{ llenarProveedor(p.nombre.toUpperCase()) }}
                    >
                      {p.nombre.toUpperCase()}
                    </button>
                  ))}                   
                </div>
            </div>
        </div>
    </div>
  )
}
