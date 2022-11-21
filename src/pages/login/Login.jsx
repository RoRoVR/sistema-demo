import team from '../../assets/svg/team.svg';
import logo from '../../assets/svg/logo-letra.svg';
import { InputPassword } from '../../components/inputs/InputPassword';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './slices/thunk';
import { ChargingScreen } from '../../components/charging-screen/ChargingScreen'


export const Login = () => {
    // VARIABLES
    const dispatch = useDispatch();
    const {cargando, error} = useSelector( s => s.login );

    const formulario = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: ( values ) => {
            dispatch( getUser( values.email, values.password ) );          
        }
    });


  return (
      <>

      { cargando&& <ChargingScreen/>}

        <div className='container' 
            style={{
                width: '100vw', 
                height: '100vh',           
                }} 
        >
            <div className="row"> 
                <form className=" mt-5 mt-sm-1 pt-5 pt-sm-1 px-5 px-sm-1 col-12 col-sm-4 d-flex flex-column justify-content-center" onSubmit={formulario.handleSubmit} >
                    
                    <div className='d-flex justify-content-center mb-5' >
                        <img src={logo} style={{ width:'250px' }} />
                    </div>

                    <div>
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input 
                        className="form-control" 
                        type="email" 
                        id="email"
                        name='email'
                        onChange={ formulario.handleChange }
                        value={ formulario.values.email }
                        placeholder="Escribe tu correo..."/>
                    </div>
                    <span className="mb-3 text-danger" style={{ fontSize:'14px' }}  > { (error.input === 'email') ? error.message : ' ' } </span>
                    <InputPassword 
                    handleChange = { formulario.handleChange }
                    password = { formulario.values.password }
                    />
                    <span className="mb-3 text-danger" style={{ fontSize:'14px' }}  > { (error.input === 'password') ? error.message : ' ' } </span>

                    <div className='d-flex justify-content-center col-12' >
                        <button type='submit' className='btn btn-primary col-6' > Iniciar sesion </button>
                    </div>

                </form>

                <div className="col-8 d-none d-sm-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                    <img src={team} style={{width: '700px'}}/>
                </div>
            </div>
        </div>
      </>
  )
}
