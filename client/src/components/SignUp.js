import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import adduser from'./img/undraw_add_user_re_5oib.svg'

export default function SignUp() {
const [firstName,setFirstName] = useState('');
const [lastName,setLastName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const [department,setDepartment] = useState('');
const [employeeID,setEmployeeID] = useState('');
const [type,setType] = useState('');
const {name} = useParams();
function signup()
{
  // console.log(lastName)
  if(firstName && lastName && email && password && department && employeeID && type !== '')
 { axios.post('http://172.16.0.100:3005/signup',{name : firstName + ' ' + lastName, email:email,password: password, department: department, empid :employeeID, type :type }).then((res) => alert(res.data.message))}
 else
 {alert('Fill all fields')}
}

  
  return (
<div className="container d-flex flex-column min-vh-100 justify-content-center">
  <div className="card o-hidden border-0 shadow-lg ">
    <div className="card-body p-0  ">
      {/* Nested Row within Card Body */}
      <div className="row">
        <div className="col-lg-5 d-none d-lg-block" ><img src={adduser} /></div>
        <div className="col-lg-7">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
            </div>
            <form className="user">
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input type="text" className="form-control form-control-user" id="exampleFirstName" onChange={(e) =>setFirstName(e.target.value)} placeholder="First Name"/>
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control form-control-user" id="exampleLastName" onChange={(e) =>setLastName(e.target.value)} placeholder="Last Name"/>
                </div>
              </div>
              <div className="form-group">
                <input type="email" className="form-control form-control-user" id="exampleInputEmail" onChange={(e) =>setEmail(e.target.value)} placeholder="Email Address"/>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input type="password" className="form-control form-control-user" id="exampleInputPassword" onChange={(e) =>setPassword(e.target.value)} placeholder="Password"/>
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control form-control-user" id="exampleRepeatPassword" onChange={(e) =>setDepartment(e.target.value)} placeholder="department"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-6 mb-3 mb-sm-0">
                  <input type="text" className="form-control form-control-user" id="exampleFirstName" onChange={(e) =>setEmployeeID(e.target.value)} placeholder="Employee ID"  />
                </div>
                <div className="col-sm-6">
                  <select type="select" className="form-select form-control-user" id="exampleLastName" style={{border:'1px solid #d6d7e5',paddingTop:'15px',paddingBottom:'15px'}} onChange={(e) =>setType(e.target.value)} placeholder="Type" >
                    <option>Choose Type</option>
                    <option value='admin'>Admin</option>
                    <option value='user'>User</option>
                    </select>
                </div>
              </div> 
              <button type='button' className="btn btn-primary btn-user btn-block" onClick={signup}>
                Register Account
              </button>
            </form>
            <hr />
            <div className="text-center">
                  <a className="small" href={`/adminDashboard/${name}`}>Back to Dashboard!</a>
                </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
