import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import photo from './img/undraw_profile.svg'
export default function Navbar(props) {
    let {adminDashboard} = useParams();
    let {name} = useParams();
    const [toggle,setToggle] = useState(false)
const passdata = (e) => {
  setToggle(!toggle)
props.sendData(toggle)
}

  return (
    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow row">
    <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" onClick={(e) => passdata(e)}>
      <i className="fa fa-bars" />
    </button>
    {props.showSearch ? <div className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div className="input-group">
          <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." onChange={(e) => props.searchs(e)} />
          <div className="input-group-append">
            <button className="btn btn-light" style={{ backgroundColor: '#ececec' }} type="button">
              <i className="fas fa-search fa-sm" style={{ color: '#858796' }} />
            </button>
          </div>
        </div>
      </div> :
     <></>}
    {props.showSearch ? 
      <div className="d-none d-sm-inline-block form-inline me-auto ml-md-3 my-3 my-md-0 mw-100 navbar-search">
        <h5 style={{ fontFamily: 'Segoe UI', fontWeight: "bold", color: '#6F6F6F' }}>ASSET MANAGEMENT</h5>
      </div> :
      <div className="col-lg-11 d-none d-sm-inline-block form-inline mx-auto my-3 mw-100 navbar-search">
        <h5 className='text-center' style={{ fontFamily: 'Segoe UI', fontWeight: "bold", color: '#6F6F6F' }}>ASSET MANAGEMENT</h5>
      </div>}
    {/* Topbar Navbar */}

    <ul className="col-lg-1 d-flex justify-content-end navbar-nav ml-auto">
      {/* Nav Item - Search Dropdown (Visible Only XS) */}

      {props.showSearch ? 
        <li className="nav-item dropdown no-arrow d-sm-none">
          <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw" />
          </a>
          {/* Dropdown - Messages */}
          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form className="form-inline mr-auto w-100 navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." onChange={(e) => props.searchs(e)}  />
                <div className="input-group-append">
                  <button className="btn btn-light" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>:<></>}

      {props.dontShow ?
      <><li className="nav-item my-4 mr-2">
        <button className="btn btn-secondary" style={{padding:'2.5px 10px'}} onClick={(e) => {props.addExtra(e); props.assignExtra(e)}}>
          Add
        </button>
 
      </li>
      <li className="nav-item my-4">
      <button type='button' className="btn btn-primary"  style={{padding:'2.5px 10px'}} onClick={(e) => {props.handleAssignSubmit(e); props.handleAddSubmit(e)}}>
          Submit
        </button>
      </li></> : <></>}
      <div className="topbar-divider d-none d-sm-block" />
      {/* Nav Item - User Information */}
      <li className="nav-item dropdown no-arrow my-1">
        <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="mr-2 d-none d-lg-inline text-gray-600 small">{adminDashboard === 'adminDashboard'? <>Hey {name}!</>: <>Hey {name}!</>}</span>
          <img className="img-profile rounded-circle" src={photo} />
        </a>
        {/* Dropdown - User Information */}
        <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
          <a className="dropdown-item" href="/" data-toggle="modal" data-target="#logoutModal">
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
            Logout
          </a>
        </div>
      </li>
    </ul>
  </nav>
  )
}
