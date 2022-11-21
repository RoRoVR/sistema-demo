import { useState } from "react";
import { useSelector } from "react-redux";
import { ItemProveedor } from "../components/ItemProveedor";
import { RegistrarProveedor } from "../registros/RegistrarProveedor";

export const ListaProveedores = ({ windowListaProveedores, setWindowListaProveedores }) => {  
    const [resgistrarProveedor, setResgistrarProveedor] = useState(false);

    const { proveedores } = useSelector(s => s.compras);

  return (
    <div className="window">

        {/* VENTANAS */}
        { resgistrarProveedor&& 
        <RegistrarProveedor resgistrarProveedor={resgistrarProveedor} setResgistrarProveedor={setResgistrarProveedor}/>}

        
        <div className="window-container-md">
            <div className="window-head">
                <span>LISTA DE PROVEEDORES</span>
                <div className="btn-exit" onClick={ () => { setWindowListaProveedores(!windowListaProveedores) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>

            <div className="window-body" >
                <div className="list-group mb-2">
                    {
                        proveedores.map(p => (
                            <div key={p.id} className="list-group-item list-group-item-action">
                                <ItemProveedor 
                                id = {p.id}
                                nombre = { p.nombre } 
                                encargado = {p.encargado} 
                                nit = {p.nit}
                                ciudad = {p.ciudad}
                                direccion = {p.direccion}
                                contacto = {p.contacto}
                                />
                               
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="window-footer">
                
                <span 
                className="text-primary" 
                style={{ cursor:'pointer' }}
                onClick={()=>{ setResgistrarProveedor(!resgistrarProveedor) }} 
                >Registrar nuevo Proveedor...
                </span>

            </div>
        </div>
    </div>
  )
}
