import { useState } from "react"

export const InputPassword = ({ handleChange, password }) => {
    const [iconPasword, setIconPasword] = useState(false);
    const styleIcon = {
        position: 'absolute',
        top:'37px',
        right:'10px',
        fontSize:'20px',
        cursor:'pointer'
    }

  return (
    <div className="position-relative">
        <label htmlFor="password" className="form-label">Contraseña:</label>
        <input type={iconPasword ? "text" : "password"} className="form-control" 
        autoComplete="off" 
        id="password"
        name="password"
        onChange={ handleChange }
        value={ password }
        />
        
        <i className= {`bi ${ iconPasword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} text-primary`}
            style= {styleIcon} 
            onClick={()=>{setIconPasword(!iconPasword)}}
        ></i>
    </div>
  )
}
