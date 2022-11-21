import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditarProveedor } from '../editar/EditarProveedor';
import { eliminarDocumentoFirebase } from '../../../productos/slices/productosThunk';

export const ItemProveedor = ({id, nombre, encargado, nit, ciudad, direccion, contacto}) => {
    const [windowEditarProveedor, setWindowEditarProveedor] = useState(false);
    const dispatch = useDispatch();
    const { actualizandoDatos } = useSelector(s => s.compras)
    
    const eliminarProveedor = () => {
        dispatch( eliminarDocumentoFirebase(`/aplicaciones/compras/proveedores/${id}`, id) );
    }


  return (
    <div className="container-fluid">

        { windowEditarProveedor&& <EditarProveedor
            windowEditarProveedor = {windowEditarProveedor}
            setWindowEditarProveedor = {setWindowEditarProveedor} 
            id = {id}
            nombre = {nombre} 
            encargado = {encargado} 
            nit = {nit}
            ciudad = {ciudad}
            direccion = {direccion}
            contacto = {contacto} /> 
        }

        <div className="row">
            <div className="col-5">
                <div className="mb-1" >
                    <p className="m-0 fw-bold" style={{ fontSize: '13px' }} >NOMBRE:</p>
                    <p className="m-0 text-uppercase" >{nombre}</p>
                </div>

                <div className="mb-1" >
                    <p className="m-0 fw-bold" style={{ fontSize: '13px' }} >ENCARGADO:</p>
                    <p className="m-0 text-uppercase" >{encargado}</p>
                </div>

                <div className="mb-1" >
                    <p className="m-0 fw-bold" style={{ fontSize: '13px' }} >NIT:</p>
                    <p className="m-0 text-uppercase" >{nit}</p>
                </div>

            </div>

            <div className="col-5">

                <div className="mb-1" >
                    <p className="m-0 fw-bold" style={{ fontSize: '13px' }} >CIUDAD:</p>
                    <p className="m-0 text-uppercase" >{ciudad}</p>
                </div>

                <div className="mb-1" >
                    <p className="m-0 fw-bold" style={{ fontSize: '13px' }} >DIRECCION:</p>
                    <p className="m-0 text-uppercase" >{direccion}</p>
                </div>

                <div className="mb-1" >
                    <p className="m-0 fw-bold" style={{ fontSize: '13px' }} >CONTACTO:</p>
                    <p className="m-0 text-uppercase" >{contacto}</p>
                </div>
            </div>
            
            <div className=" col-2 d-flex justify-content-center align-items-center ">
                <div className="btn-icon-success me-3" onClick={()=>{ setWindowEditarProveedor(!windowEditarProveedor) }} >
                    <i className="bi bi-pencil-square"></i>
                </div>
                <button className="btn-icon-danger"  onClick={()=>{ eliminarProveedor() }} disabled={actualizandoDatos} >
                    {
                        actualizandoDatos ? 
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <i className="bi bi-trash-fill"></i>
                    }
                </button>
            </div>
        </div>
    </div> 
  )
}
