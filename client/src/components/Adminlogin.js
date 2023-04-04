import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Adminlogin() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [check,setCheck] = useState(false)
  const navigate = useNavigate()


function login()
{
  axios.post('http://172.16.0.100:3005/adminlogin',{email : email, password : password}).then(res => res.data.message === 'Successfully Login' ?  navigate(`/adminDashboard/${res.data.user.name}`) : alert(res.data.message))
}
  return (
  <div className="row justify-content-center">
    <div className="col-xl-10 col-lg-12 col-md-9">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* Nested Row within Card Body */}
          <div className="row">
            <div className="col-lg-6 d-none d-lg-block bg-Admin-image" />
            <div className="col-lg-6">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">Welcome Back! Admin</h1>
                </div>
                <form className="user">
                  <div className="form-group">
                    <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <input type={!check ? "password" : 'text'} className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <div className="form-group">
                    <div className="custom-control custom-checkbox small">
                      <input type="checkbox" className="custom-control-input" onChange = {(e) => setCheck(!check)} id="customCheck" />
                      <label className="custom-control-label"  htmlFor="customCheck">Show Password</label>
                    </div>
                  </div>
                  <a className="btn btn-warning btn-user btn-block" onClick={login}>
                    Login
                  </a>
                  {/* <hr /> */}
                  {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                    <i className="fab fa-google fa-fw" /> Login with Google
                  </a>
                  <a href="index.html" className="btn btn-facebook btn-user btn-block">
                    <i className="fab fa-facebook-f fa-fw" /> Login with Facebook
                  </a> */}
                </form>
                <hr />
                {/* <div className="text-center">
                  <a className="small" href="forgot-password.html">Forgot Password?</a>
                </div> */}
                {/* <div className="text-center">
                  <a className="small" href="">Create an User Account!</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>



  )
}
