import React from 'react';
import logo from './img/RURUTEK - Logo Original.svg';
import logo2 from './img/Rurutek Logo Icon.svg';
import { useState } from 'react';
import { AiFillDashboard } from 'react-icons/ai';

export default function UserSidebar(props) {
    const [toggle,setToggle] = useState(false)
    
  return (
    <ul className={toggle || props.toggleit ? "navbar-nav bg-white sidebar sidebar-light accordion" : "navbar-nav bg-white sidebar sidebar-light accordion toggled"} style={{zIndex:'999',boxShadow: '0 .20rem 2.75rem 0 rgba(58,59,69,.15)'}} id="accordionSidebar">
    {/* Sidebar - Brand */}
    <a className="sidebar-brand d-flex align-items-center justify-content-center">
    <div className="sidebar-brand-icon py-2 px-3 rounded">
      {toggle ?<img src={logo}/>:<img src={logo2}/>}
      </div>
      {/* <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div> */}
      
    </a>
    {/* Divider */}
    <hr className="sidebar-divider my-0" />
    {/* Nav Item - Dashboard */}
    <li className="nav-item active">
      <a className="nav-link">
      <i className="fas fa-fw"> <AiFillDashboard /></i>
      <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Assets</span></a>
    </li>
    <hr className="sidebar-divider" />
    {/* Heading */}
    <div className="sidebar-heading " style={{color:'#6F6F6F'}}>
      Redirect
    </div>
    {/* Nav Item - Pages Collapse Menu */}
    <li className="nav-item">
      <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
        <i className="fas fa-fw fa-folder" />
        <span className='font-weight-bold' style={{color:'#6F6F6F'}}>Login</span>
      </a>
      <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header" style={{color:'#6F6F6F'}}>Login Screens:</h6>
          <a className="collapse-item" data-toggle="modal" data-target="#logoutModal">Admin / User Login</a>
          {/* <a className="collapse-item" href="/userLogin">User Login</a> */}
        </div>
      </div>
    </li>
    {/* <li className="nav-item">
      <a className="nav-link" href="table">
        <i className="fas fa-fw fa-table" />
        <span>View</span></a>
    </li> */}
    {/* Divider */}
    <hr className="sidebar-divider d-none d-md-block" />
    {/* Sidebar Toggler (Sidebar) */}
    <div className="text-center d-none d-md-inline">
      <button className="rounded-circle border-0" id="sidebarToggle" onClick={(e)=>setToggle(!toggle)} />
    </div>
    {/* Sidebar Message */}
  </ul>
  )
}
