import React from 'react'
import { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import ScrollToTop from "react-scroll-to-top";
import { useParams } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import UserSidebar from './UserSidebar';
import Dashboard from './Dashboard';
import AddAsset from './AddAsset';
import AssignAsset from './AssignAsset';
import axios from 'axios';
import UserDashboard from './UserDashboard';
import Swal from 'sweetalert2';
import SignUp from './SignUp';

export default function Index() {
  let { adminDashboard } = useParams();
  let { name } = useParams();
  // let Random = Math.floor(1000 * Math.random());
  const [tempToggle, setTempToggle] = useState(false)
  const [user,setUser] = useState([])
  const [showadd, setShowadd] = useState(false)
  const [showAssign, setShowassign] = useState(false)
  // const [showsignup, setShowsignup] = useState(false)
  const [searches ,setSearches] = useState('')
 
        useEffect(() => {
          axios.get(`http://172.16.0.100:3005/getoneuser/${name}`).then((res)=>setUser(res.data))
        },[name] )

  const sendData = (gettoggle) => {
    setTempToggle(gettoggle)
  }
  const sendrequest = (ishowadd, ishowassign) => {
    setShowadd(ishowadd)
    setShowassign(ishowassign)
  }
  const searchs = (e) =>
  {
    setSearches(e.target.value)
  }
  //addAsset
  const initialAdd = { brand: '', model: '', type: '', serialno: '', worth: '', assetID: '' };

  const [addAsset, setAddAsset] = useState([{ ...initialAdd }, { ...initialAdd }, { ...initialAdd }, { ...initialAdd }])

  const addExtra = (e) => {
    let add = {
      brand: '',
      model: '',
      type: '',
      serialno: '',
      worth: '',
    }
    { showadd && showAssign && setAddAsset((prev) => [...prev, add]) }
  }
  const deleteAdd = (index) => {
    setAddAsset((prev) => prev.filter((pre) => prev.indexOf(pre) !== index))
  }
  const handleAddChange = (index, event) => {

    {
      const values = [...addAsset];
      values[index][event.target.name] = event.target.value;
      setAddAsset(values);
    }

  }
  const handleAddSubmit = (e) => {
    {
     let lengthofadd = addAsset.filter((add)=> add.brand !== '' && add.model !== '' && add.type !== '' && add.serialno !== '' && add.worth !== '' && add.assetID !== '').map((lol,index) => {return index} )

     let valueSerialNo = addAsset.map(function(item){ return item.serialno.toLocaleUpperCase()});
     let isDuplicateSerialno = valueSerialNo.filter(function(item, idx){ 
         return valueSerialNo.indexOf(item) != idx
     });  
     let valueAssetID = addAsset.map(function(item){ return item.assetID.toLocaleUpperCase()});
     let isDuplicateAssetid = valueAssetID.filter(function(item, idx){ 
         return valueAssetID.indexOf(item) != idx
     });

if(!isDuplicateAssetid[0] && !isDuplicateSerialno[0])
{ 
      showadd && showAssign && addAsset.map((add, index) => {
      
        if (add.brand === '' && add.model === '' && add.type === '' && add.serialno === '' && add.worth === '' && add.assetID === '') 
        { 
          Swal.fire({ customClass: { confirmButton: 'btn btn-danger px-4 py-1' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Fill out all fields` + "</h5>", buttonsStyling: false }).then((e) => setAddAsset([{ ...initialAdd }, { ...initialAdd }, { ...initialAdd }, { ...initialAdd }])) 
        } 
        else { 
          axios.post('http://172.16.0.100:3005/idleasset', add)
          axios.post('http://172.16.0.100:3005/addasset', add)
          .then((res) => {
            res.data.message === 'Submitted' ? 
            Swal.fire({timer: 1500,timerProgressBar: true, customClass: { confirmButton: 'btn btn-success px-4 py-1' }, icon: 'success', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `${res.data.message} ${lengthofadd.length} Asset` + "</h5>", buttonsStyling: false })
            :
            Swal.fire({ customClass: { confirmButton: 'btn btn-danger px-4 py-1' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `${res.data.message}` + "</h5>", buttonsStyling: false })
            }
          ).then((e) => setAddAsset([{ ...initialAdd }, { ...initialAdd }, { ...initialAdd }, { ...initialAdd }]))
          
        }
      })
    }
    else
    {
      let Nil = 'Nil'
      Swal.fire({ customClass: { confirmButton: 'btn btn-danger px-4 py-1' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Found already assigned Serial No: ${isDuplicateSerialno[0]? isDuplicateSerialno[0]: Nil} and AssetID: ${isDuplicateAssetid[0] ? isDuplicateAssetid[0]: Nil}` + "</h5>", buttonsStyling: false }).then((e) => setAddAsset([{ ...initialAdd }, { ...initialAdd }, { ...initialAdd }, { ...initialAdd }]))
    }
    }
  }
  //addAsset


  //assignAsset
  const intialAssign = { issueddate: '', assignasset: '', serialno: '', towhom: '', remark: '' }

  const [assignAsset, setAssignAsset] = useState([{ ...intialAssign }, { ...intialAssign }, { ...intialAssign }, { ...intialAssign }])

  const assignExtra = (e) => {
    let add = {
      issueddate: '',
      assignasset: '',
      serialno: '',
      towhom: '',
      remark: ''
    }
    { showadd && !showAssign && setAssignAsset((prev) => [...prev, add]) }
  }
  const deleteAssign = (index) => {
    setAssignAsset((prev) => prev.filter((pre) => prev.indexOf(pre) !== index))
  }
  const handleAssignChange = (index, event, getserialno) => {
    const values = [...assignAsset];
    values[index][event.target.name] = event.target.value;
    if (getserialno) { values[index]['serialno'] = getserialno; }
    setAssignAsset(values);
    console.log(assignAsset)
  }
  const handleAssignSubmit = (e) => {
    {
      let valueArr = assignAsset.map(function(item){ return item.serialno });
      let isDuplicate = valueArr.filter(function(item, idx){ 
          return valueArr.indexOf(item) != idx 
      });  
      let lengthofassign = assignAsset.filter((assign)=> assign.issueddate !== '' && assign.assignasset !== '' && assign.towhom !== '' && assign.serialno !== '').map((lol,index) => {return index} )
      // console.log(assignAsset)
      console.log(isDuplicate[0])
      if(!isDuplicate[0])
      {
        showadd && !showAssign && assignAsset.map((assign,index) => {
          if (assign.issueddate !== '' && assign.assignasset !== '' && assign.towhom !== '' && assign.serialno !== '') 
          { 
          axios.delete(`http://172.16.0.100:3005/deleteoneidleasset/${assign.serialno}`);
          axios.post('http://172.16.0.100:3005/assignasset', assign)
          .then((res) => {
            res.data.message === 'Assigned' ? 
            Swal.fire({timer: 1500,timerProgressBar: true, customClass: { confirmButton: 'btn btn-success px-4 py-1' }, icon: 'success', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `${res.data.message} ${lengthofassign.length} Asset` + "</h5>", buttonsStyling: false })
            :
            Swal.fire({ customClass: { confirmButton: 'btn btn-danger px-4 py-1' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `${res.data.message}` + "</h5>", buttonsStyling: false })
            }
          ).then((e) => setAssignAsset([{ ...intialAssign }, { ...intialAssign }, { ...intialAssign }, { ...intialAssign }]))
          }
          else { Swal.fire({ customClass: { confirmButton: 'btn btn-danger px-4 py-1' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Fill out all fields` + "</h5>", buttonsStyling: false }).then((e) => setAssignAsset([{ ...intialAssign }, { ...intialAssign }, { ...intialAssign }, { ...intialAssign }])) }
        }
        )
      }
      else
      {
         Swal.fire({ customClass: { confirmButton: 'btn btn-danger px-4 py-1' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Found already assigned Serial No: ${isDuplicate[0]}` + "</h5>", buttonsStyling: false }).then((e) => setAssignAsset([{ ...intialAssign }, { ...intialAssign }, { ...intialAssign }, { ...intialAssign }]))
      }

    }
  }
  //assignAsset
console.log(user)
  return (
    <div>
      <div id="wrapper">
        {user.type === 'user' && <UserSidebar toggleit={tempToggle}></UserSidebar>}
        {user.type === 'admin' && <AdminSidebar toggleit={tempToggle} name = {name} sendrequest={sendrequest}></AdminSidebar>}
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
          {user.type === 'user' && <Navbar sendData={sendData} addExtra={addExtra} assignExtra={assignExtra} handleAssignSubmit={handleAssignSubmit} handleAddSubmit={handleAddSubmit} searchs = {searchs} dontShow={showadd ? true : false} showSearch= {false}></Navbar>}
           {user.type === 'admin' && <Navbar sendData={sendData} addExtra={addExtra} assignExtra={assignExtra} handleAssignSubmit={handleAssignSubmit} handleAddSubmit={handleAddSubmit} searchs = {searchs} dontShow={showadd ? true : false} showSearch= {true}></Navbar>}
            {showadd && showAssign && <AddAsset addAsset={addAsset} handleAddChange={handleAddChange} deleteAdd={deleteAdd} ></AddAsset>}
            {showadd && !showAssign && <AssignAsset assignAsset={assignAsset} handleAssignChange={handleAssignChange} deleteAssign={deleteAssign}></AssignAsset>}
            {/* {showsignup && <SignUp></SignUp>} */}
            {!showadd && user.type === 'admin' && <Dashboard getsearchvalue = {searches}></Dashboard>}
            {user.type === 'user' && <UserDashboard></UserDashboard>}
          </div>
        </div>
      </div>
      <ScrollToTop smooth className="scroll-to-top rounded bg-light" viewBox="0 0 16 27" svgPath="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" ></ScrollToTop>
      {/* Logout Modal*/}
      <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
              <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
            <div className="modal-footer">
              <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
              <a className="btn btn-primary" href="/">Logout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
