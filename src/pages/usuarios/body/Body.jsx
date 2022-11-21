import React from 'react'
import { useSelector } from 'react-redux'
import { CardUser } from '../components/CardUser';

export const Body = () => {

  const {usuarios} = useSelector(s => s.usuarios);

  return (
    <div className='aplication-body'>
        <div className="aplication-body-container">

          <div className="container-fluid">
            <div className="row">
              {usuarios.map((user, index) =>(
                  <div className='col-6' key={index}>
                    <CardUser user={user} />
                  </div>
                ))}
            </div>
          </div>

        </div>
    </div>
  )
}
