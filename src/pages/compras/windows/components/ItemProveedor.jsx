import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditarProveedor } from '../editar/EditarProveedor';
import { AlertNotification } from '../../components/AlertNotification';
import { eliminarDocumentoFirebase } from '../../slices/comprasThunk';

export const ItemProveedor = ({id, nombre, encargado, nit, ciudad, direccion, contacto}) => {
    const [editarProveedor, setEditarProveedor] = useState(false);
    const [alertNotification, setAlertNotification] = useState(false);


    const dispatch = useDispatch();
    const { actualizandoDatos } = useSelector(s => s.compras);
    
    const eliminarProveedor = () => {
        dispatch( eliminarDocumentoFirebase(`/aplicaciones/compras/proveedores/${id}`, id) );
    }


  return (
    <div className="container-fluid">

        {/* VENTANAS */}
        { editarProveedor&& <EditarProveedor
            editarProveedor = {editarProveedor}
            setEditarProveedor = {setEditarProveedor} 
            id = {id}
            nombre = {nombre} 
            encargado = {encargado} 
            nit = {nit}
            ciudad = {ciudad}
            direccion = {direccion}
            contacto = {contacto} /> 
        }
        { alertNotification&& 
        <AlertNotification 
        alertNotification={alertNotification} 
        setAlertNotification={setAlertNotification} 
        titulo={'eliminar proveedor'}
        mensaje={`Estas a punto de eliminar ${nombre.toUpperCase()} ¿Deseas continuar?`}
        funcion={eliminarProveedor}
        /> }

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
                <div className="btn-icon-success me-3" onClick={()=>{ setEditarProveedor(!editarProveedor) }} >
                    <i className="bi bi-pencil-square"></i>
                </div>
                <button className="btn-icon-danger"  onClick={()=>{ setAlertNotification(!alertNotification) }} disabled={actualizandoDatos} >
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
