
import React, { useState } from 'react'
import Adminlogin from './Adminlogin'
import Userlogin from './Userlogin'

export default function Login() {
    const [show,setShow] = useState(true)
    const showUser = () => {
        setShow(false)
    }
    const showAdmin = () => {
        setShow(true)
    }
  return (<>
      <div className="container">
        <div className='showtheshit'>
<nav class="navbar navbar-expand-sm navbar-light">
    <div class={!show ?' navbar-collapse' : 'navbar-collapse'} id="navbarNav">
      <ul class="navbar-nav py-2 mx-auto">
        <li class="nav-item border-bottom-warning text-lg py-1">
          <a class="nav-link"style={{fontFamily:'Segoe UI',fontWeight:"bold",cursor:'pointer'}} onClick={showAdmin}>Admin</a>
        </li>
        <li class="nav-item  text-lg py-1 border-bottom-primary">
          <a class="nav-link" style={{fontFamily:'Segoe UI',fontWeight:"bold",cursor:'pointer'}} onClick={showUser}>User</a>
        </li>
      </ul>
    </div>
</nav>
</div>
{show ?  <Adminlogin></Adminlogin> : <Userlogin></Userlogin>}
</div>
</>
  )
}
