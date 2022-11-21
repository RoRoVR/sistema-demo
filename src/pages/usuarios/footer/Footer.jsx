
export const Footer = ({ setNuevoUsuario }) => {
  return (
    <div className='aplication-footer' >
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="btn btn-primary" onClick={() => setNuevoUsuario(s => !s)} >Nuevo usuario</div>
          </div>
        </div>
      </div>
    </div>
  )
}
