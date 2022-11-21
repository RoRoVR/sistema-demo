import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editarDocumentoUsuarios } from '../slices/usuariosThunk';

export const CardUser = ({ user }) => {

    const dispatch = useDispatch();
    const {actualizandoDatos, actualizacionExitosa} = useSelector(s => s.usuarios);
    
    const [productos, setProductos] = useState(user.permisos.productos);
    const [almacen, setAlmacen] = useState(user.permisos.almacen);
    const [compras, setCompras] = useState(user.permisos.compras);
    const [ventas, setVentas] = useState(user.permisos.ventas);    
    const [reportes, setReportes] = useState(user.permisos.reportes);
    const [usuarios, setUsuarios] = useState(user.permisos.usuarios);

    const [noEdit, setNoEdit] = useState(true);

    const guardarEdicion = (e) => {
        e.preventDefault();

        const ubicacion = `/usuarios/${user.id}`;
        console.log( ubicacion );
        const {cargo, email, imgUrl, nombre, password, uid} = user;
        const permisos = { productos, almacen, compras, ventas, reportes, usuarios }
        const newUser =  { cargo, email, imgUrl, nombre, password, uid, permisos};
        console.log(newUser);

        dispatch( editarDocumentoUsuarios( ubicacion, newUser ) );
    }

  return (
    <form className="card mb-3" onSubmit={guardarEdicion} >
        <div className="row g-0">
            <div className="col-md-4">
                <img src={user.imgUrl} className="img-fluid rounded-start"/>
            </div>
            <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title mb-0">{ user.nombre }</h5>
                    <p className="card-text mb-2"><small className="text-muted">{user.cargo.toUpperCase()}</small></p>
                    <p className="card-text mb-0"><span className='fw-bold' >Correo:</span> {user.email}</p>
                    <p className="card-text mb-0"> <span className='fw-bold' >Contraseña: </span>{user.password}</p>

                    <div className="row mt-3">

                        <div className="form-check col-6">
                            <input className="form-check-input" 
                            type="checkbox" 
                            id="productos" 
                            disabled={noEdit}
                            checked={productos} 
                            onChange={()=>{setProductos(!productos)}}
                            />

                            <label className="form-check-label" htmlFor="productos">Productos</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" 
                            type="checkbox" 
                            id="almacen" 
                            disabled={noEdit}
                            checked={almacen} 
                            onChange={()=>{setAlmacen(!almacen)}} 
                            />

                            <label className="form-check-label" htmlFor="almacen">Almacen</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" 
                            type="checkbox" 
                            id="compras" 
                            disabled={noEdit}
                            checked={compras} 
                            onChange={()=>{setCompras(!compras)}}
                            />

                            <label className="form-check-label" htmlFor="compras">Compras</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" 
                            type="checkbox" 
                            id="ventas" 
                            disabled={noEdit}
                            checked={ventas} 
                            onChange={()=>{setVentas(!ventas)}}
                            />

                            <label className="form-check-label" htmlFor="ventas">Ventas</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" 
                            type="checkbox" 
                            id="reportes" 
                            disabled={noEdit}
                            checked={reportes} 
                            onChange={()=>{setReportes(!reportes)}}
                            />

                            <label className="form-check-label" htmlFor="reportes">Reportes</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" 
                            type="checkbox" 
                            id="usuarios" 
                            disabled={noEdit}
                            checked={usuarios} 
                            onChange={()=>{setUsuarios(!usuarios)}}
                            />

                            <label className="form-check-label" htmlFor="usuarios">Usuarios</label>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        <div className="card-footer">
            {noEdit?
                <div className="btn btn-primary" onClick={()=>{ setNoEdit(false) }} >Editar</div>
                :
                <>
                    <div className="btn btn-danger me-3" onClick={()=>{ setNoEdit(true) }} >Cancelar</div>
                    <button type='submit' className='btn btn-success'>
                        { actualizandoDatos &&
                            <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }
                        { actualizacionExitosa &&
                          <i className="bi bi-check-circle-fill me-2"></i>
                        }
                        Guardar
                    </button>
                </>
            }
        </div>
    </form>
  )
}
