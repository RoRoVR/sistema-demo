import logo from '../../assets/svg/logo-letra BN.svg'

export const ChargingScreen = () => {
  return (
    <div
    style={{
        width: '100vw',
        height: '100vh',
        backgroundColor:'#313131',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        zIndex:'3000'
    }}
    >
        <img src={ logo } style={{ width:'30%', marginRight:'20px' }} />

        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
  )
}
