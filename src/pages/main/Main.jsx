import { useState } from "react"
import { Outlet } from "react-router-dom"
import { Sidebar } from "../../components/sidebar/Sidebar"

export const Main = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="container-main" >
        <Sidebar active={ active } setActive={ setActive } />
        <div className={active ? "container-aplication active" : "container-aplication no-active"} >
          <Outlet/>
        </div>
    </div>
  )
}
