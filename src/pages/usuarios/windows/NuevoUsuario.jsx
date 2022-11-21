import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { guardarDocumentoConArchivoUsuarios, guardarDocumentoUsuarios } from "../slices/usuariosThunk";

export const NuevoUsuario = ({ setNuevoUsuario }) => {

    const refInputFile = useRef();
    const dispatch = useDispatch();
    const [nameFile, setNameFile] = useState('Subir foto de perfil...');

    // LOGO DEFAULD
    const [imgUrl, setImgUrl] = useState('https://firebasestorage.googleapis.com/v0/b/soluciones-electricas-tja.appspot.com/o/logos%2FLogo%20Nuevo.png?alt=media&token=b4b2fc18-1752-4ba0-b573-85b314d485f3');

    // Email DEFAULD
    const restEmail = '@artwithcodes.com';

    const [inputFile, setInputFile] = useState('');
    
    const [productos, setProductos] = useState(false);
    const [almacen, setAlmacen] = useState(false);
    const [compras, setCompras] = useState(false);
    const [ventas, setVentas] = useState(false);
    const [reportes, setReportes] = useState(false);
    const [usuarios, setUsuarios] = useState(false);

    const [errorPassword, setErrorPassword] = useState({ error: false, message:'' });
    const [errorUsuario, setErrorUsuario] = useState(false);

    const {usuarios:users, actualizandoDatos, actualizacionExitosa} = useSelector(s => s.usuarios);

    //FUNCIONES
    // Cambia el texto del espacio donde subir la imagen
    const obtenerDatosImagen = (e) => {
      const nombre = e.target.files[0].name;
      let url = URL.createObjectURL(e.target.files[0]);
      const archivo = refInputFile.current.files[0];
      setInputFile( archivo );
      setImgUrl(url);
      setNameFile(nombre);
    }
    
    const formulario = useFormik({
        initialValues:{
            email:'',
            password:'',
            password2:'',
            nombre:'',
            cargo:'',
            contacto: '',
        },
        onSubmit: (values) => {
            let verificarEmail = true;

            for (let i = 0; i < users.length; i++) {
                if( users[i].email === `${values.email}${restEmail}` ){
                    verificarEmail = false;
                    break;
                }  
            }

            if(verificarEmail){
                setErrorUsuario(false);
                if(values.password === values.password2){

                    if(values.password.length >= 8){
                        setErrorPassword(false);
                        const permisos = {
                            almacen,
                            compras,
                            reportes,
                            productos,
                            usuarios,
                            ventas
                        };
                        const newUser = {
                            cargo: values.cargo,
                            email: `${values.email}${restEmail}`,
                            nombre: values.nombre,
                            contacto: values.contacto,
                            password: values.password,
                            permisos
                        }
                        const ubicacion = '/usuarios';
                        if( inputFile ){
                            console.log('Con imagen');
                            console.log( newUser );
                            dispatch( guardarDocumentoConArchivoUsuarios( ubicacion, newUser, inputFile ) );
            
                        }else{
                            console.log('Sin imagen');
                            newUser.imgUrl = imgUrl;
                            console.log( newUser );
                            dispatch( guardarDocumentoUsuarios( ubicacion, newUser ) ); 
                        }
                    }else{
                        setErrorPassword({ error: true, message:'La contraseña debe tener mas de 8 caracteres' });
                    }
                }else{
                    setErrorPassword({ error: true, message:'La contraseña no coincide' });
                }
            }else{
                setErrorUsuario(true);
            }
        }
    });

  return (
    <div className='window' >
        <form className="window-container-sm" onSubmit={ formulario.handleSubmit } >
            <div className="window-head">
                <span>Crear nuevo usuario</span>
                <div className="btn-exit" onClick={ () => { setNuevoUsuario(s => !s) } } >
                    <i className="bi bi-x"></i>
                </div>
            </div>
            <div className="window-body">

            <div className="col-12 d-flex flex-column justify-content-center align-items-center">
                <div className='preview-img mb-3' >
                    <img src={imgUrl}/>
                </div>

                <div className='input-file mb-4' >
                    <div className='input-file-title' >
                        <i className="bi bi-cloud-arrow-up-fill"></i>
                        <span className='m-0' >{ nameFile }</span>
                    </div>
                    <input type="file" id='imgUrl'accept='image/*' ref={refInputFile} onChange={obtenerDatosImagen} />
                </div >
            </div>



                <div className="container-fluid">
                    <div className="row mb-3 ">
                        <div className="col-12">
                            <label htmlFor="nombre">Nombre y apellido:</label>
                            <input 
                            type="text" 
                            className='form-control py-1'
                            id='nombre'
                            name='nombre'
                            onChange={ formulario.handleChange }
                            value={ formulario.values.nombre }
                            autoComplete='off'
                            required
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="nombre">Contacto:</label>
                            <input 
                            type="number" 
                            className='form-control py-1'
                            id='contacto'
                            name='contacto'
                            onChange={ formulario.handleChange }
                            value={ formulario.values.contacto }
                            autoComplete='off'
                            required
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="cargo">Cargo:</label>
                            <input 
                            type="text" 
                            className='form-control py-1'
                            id='cargo'
                            name='cargo'
                            onChange={ formulario.handleChange }
                            value={ formulario.values.cargo }
                            autoComplete='off'
                            required
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="email">Email:</label>
                            <div className="input-group">
                                <input 
                                type="text" 
                                className='form-control py-1'
                                id='email'
                                name='email'
                                onChange={ formulario.handleChange }
                                value={ formulario.values.email }
                                autoComplete='off'
                                required
                                />
                                <span className="input-group-text" >{restEmail}</span>
                            </div>
                            {errorUsuario&& <span className="text-danger" >El correo ya fue registrado. Intenta con otro.</span>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="password">Contraseña:</label>
                            <input 
                            type="password" 
                            className='form-control py-1'
                            id='password'
                            name='password'
                            onChange={ formulario.handleChange }
                            value={ formulario.values.password }
                            autoComplete='off'
                            required
                            />
                        </div>

                        <div className="col-12">
                            <label htmlFor="password2">Confirmar contraseña:</label>
                            <input 
                            type="password" 
                            className='form-control py-1'
                            id='password2'
                            name='password2'
                            onChange={ formulario.handleChange }
                            value={ formulario.values.password2 }
                            autoComplete='off'
                            required
                            />
                            {errorPassword.error&& <span className="text-danger" >{errorPassword.message}</span>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12 mb-2 fw-bold">Accesos del usuario</div>

                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="productos" checked={productos} onChange={()=>{setProductos(!productos)}}/>
                            <label className="form-check-label" htmlFor="productos">Productos</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="almacen" checked={almacen} onChange={()=>{setAlmacen(!almacen)}} />
                            <label className="form-check-label" htmlFor="almacen">Almacen</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="compras" checked={compras} onChange={()=>{setCompras(!compras)}}/>
                            <label className="form-check-label" htmlFor="compras">Compras</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="ventas" checked={ventas} onChange={()=>{setVentas(!ventas)}}/>
                            <label className="form-check-label" htmlFor="ventas">Ventas</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="reportes" checked={reportes} onChange={()=>{setReportes(!reportes)}}/>
                            <label className="form-check-label" htmlFor="reportes">Reportes</label>
                        </div>
                        <div className="form-check col-6">
                            <input className="form-check-input" type="checkbox" id="usuarios" checked={usuarios} onChange={()=>{setUsuarios(!usuarios)}}/>
                            <label className="form-check-label" htmlFor="usuarios">Usuarios</label>
                        </div>
                    </div>

                    <div className="row justify-content-center my-3">
                        <button type='submit' className="btn btn-success col-5 mx-1" disabled={actualizandoDatos} >
                            { actualizandoDatos &&
                                <div className="spinner-border spinner-border-sm text-white me-2" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                            { actualizacionExitosa &&
                                    <i className="bi bi-check-circle-fill me-2"></i>
                            }
                            Registrar
                        </button>
                        <div className="btn btn-danger col-5 mx-1" onClick={ () => { setNuevoUsuario(s => !s) } } > Cancelar </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}
