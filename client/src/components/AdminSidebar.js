import React from 'react';
import logo from './img/RURUTEK - Logo Original.svg';
import logo2 from './img/Rurutek Logo Icon.svg';
import { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { MdLogin } from 'react-icons/md';


export default function AdminSidebar(props) {
  const [toggle, setToggle] = useState(false)

  const sendrequest = (showadd, showaddassign) => {
    props.sendrequest(showadd, showaddassign)
  }

  return (
    <ul className={toggle || props.toggleit ? "navbar-nav bg-white sidebar sidebar-light accordion" : "navbar-nav bg-white sidebar sidebar-light accordion toggled"}  style={{zIndex:'999',boxShadow: '0 .20rem 2.75rem 0 rgba(58,59,69,.15)'}} id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center">
        <div className="sidebar-brand-icon rounded" >
          {toggle ? <img src={logo} /> : <img src={logo2} />}
        </div>
      </a>

      <hr className="sidebar-divider my-0" />
      <li className="nav-item active bg-white ">
        <a className="nav-link" style={{cursor:'pointer'}} onClick={(e) => sendrequest(false)} >
        <i className="fas fa-fw fa-solid fa-tachometer-alt" />
          <span>Dashboard</span></a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading my-2" style={{color:'#6F6F6F'}}>
        Inventory
      </div>

      {/* <li className="nav-item bg-white my-1">
        <a className="nav-link collapsed" >
          <i className="fas fa-fw fa-cog" />
          <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Assets</span>
        </a>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header" style={{color:'#6F6F6F'}}>Customize Assets</h6>
            <a className="collapse-item" style={{cursor:'pointer'}} onClick={(e) => sendrequest(true, true)}>Add Assets</a>
            <a className="collapse-item" style={{cursor:'pointer'}} onClick={(e) => sendrequest(true, false)}>Assign Assets</a>
          </div>
        </div>
      </li> */}

      <li className="nav-item bg-white my-1">
      <a className="nav-link collapsed" style={{cursor:'pointer'}} onClick={(e) => sendrequest(true, true)}>
          <i className="fas fa-fw fa-cog" />
          <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Add Assets</span>
        </a>
      </li>

      <li className="nav-item bg-white my-1">
      <a className="nav-link collapsed" style={{cursor:'pointer'}} onClick={(e) => sendrequest(true, false)}>
          <i className="fas fa-fw fa-solid fa-user-plus"> </i>
          <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Assign Assets</span>
        </a>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading my-2" style={{color:'#6F6F6F'}}>
        Redirect
      </div>
      <li className="nav-item bg-white my-1">
        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
          <i className="fas fa-fw" ><MdLogin/> </i>
          <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Login</span>
        </a>
        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header" style={{color:'#6F6F6F'}}>Login Screens:</h6>
            <a className="collapse-item" href="/" style={{cursor:'pointer'}} data-toggle="modal" data-target="#logoutModal">Admin / User Login</a>
          </div>
        </div>
      </li>
      <li className="nav-item bg-white my-1">
      <a className="nav-link collapsed" style={{cursor:'pointer'}} href={`/signup/${props.name}`}>
          <i className="fas fa-fw "><FaUserEdit/> </i>
          <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Register User</span>
        </a>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle" onClick={(e) => setToggle(!toggle)} />
      </div>

    </ul>
  )
}
