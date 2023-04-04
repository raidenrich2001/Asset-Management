import React, { useEffect, useState } from 'react'
import './Form.css';
import { BsFillCalendar2DayFill, BsFillLaptopFill, BsFillChatLeftTextFill } from "react-icons/bs";
import { MdOutlineAssignmentInd } from "react-icons/md";
// import './core.css';
import './AssignAssets.css';
import axios from 'axios';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';

export default function AssignAsset(props) {

  const [selectuser,setSelectuser] = useState([])
  const [availableAsset, setAvailableAsset] = useState([])
  const [assetpage, setAssetPage] = useState(0)
  const [assetlength, setAssetLength] = useState()
  const pageAssetCount = Math.ceil(assetlength / 3);
  const [temp, setTemp] = useState([])

function sendtocheck(e)
{
  return availableAsset.find((fil => {return e.split(/\s/).includes(fil.serialno)} )).serialno
}
  // availableAsset.find((fil => e.target.value.includes(fil.serialno))).serialno

  const tempo = (index, gettext) => {
    const values = [...temp];
    values[index] = gettext;
    setTemp(values)
  }
  useEffect(()=> {axios.get(`http://172.16.0.100:3005/getalluser`).then((res) => setSelectuser(res.data))},[assetpage])

  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallselectassetlimited?page=${assetpage}`).then((res) => setAvailableAsset(res.data)) }
    , [availableAsset,assetpage])

  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallidleassetlength`).then((res) => setAssetLength(res.data)) }
    , [assetpage])

  return (
    <div className="container-fluid">
      <div class="row" id='overflowtry'>
        {props.assignAsset.map((assign, index) =>
          <div class="col-lg-6">
            <div class="card shadow mb-4">
              <div class="card-header d-flex flex-row py-1 justify-content-between">
                <h6 class="m-0 font-weight-bold py-2 text-primary">Assign Asset {index + 1}</h6>
                <button className='btn btn-light px-2 pt-1' style={{ color: '#ff5f5f', border: 'none' }} onClick={() => props.deleteAssign(index)} ><FaTrash style={{ color: '#e74a3b' }} /></button>
              </div>
              <div className="card-body">
                <form>
                  <div className="row mb-2">
                    <label className="col-sm-3 pl-4 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Issued Date</label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><BsFillCalendar2DayFill /></span>
                        <input type="date" style={{ borderLeft: 'none' }} className="form-control" value={assign.issueddate} onChange={(e) => props.handleAssignChange(index, e)} name="issueddate" required />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 pl-4 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Assign {pageAssetCount !== 0 ? <>{assetpage + 1}/{pageAssetCount}</> : <>0/0</>}
                      <AiFillCaretLeft role='button' onClick={() => { if (assetpage >= 1) { setAssetPage(assetpage - 1) } }} style={{ fontSize: 18, width: 13, color: '858796' }}></AiFillCaretLeft>
                      <AiFillCaretRight role='button' onClick={() => { if (assetpage !== (pageAssetCount - 1)) { setAssetPage(assetpage + 1) } }} style={{ fontSize: 18, width: 13, color: '#858796' }}></AiFillCaretRight>
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><BsFillLaptopFill /></span>
                        <select class="form-select" value={assign.assignasset} onChange={(e) => { tempo(index, e.target.value); props.handleAssignChange(index, e, sendtocheck(e.target.value)) }} name="assignasset">
                          <option>{temp[index] ? <span style={{ color: 'red' }}>Selected = {temp[index]}</span> : <>Choose Asset / Assign </>}</option>
                          {availableAsset?.map((print, index) => <option value={`AssetID : ${print.assetID} / SerialNo : ${print.serialno}`}>AssetID : {print.assetID} / SerialNo : {print.serialno}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 pl-4 text-dark col-form-label" htmlFor="basic-icon-default-fullname">To Whom</label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-merge ">
                        <span className="input-group-text"><MdOutlineAssignmentInd /></span>
                        <select className="form-select" style={{ borderLeft: 'none' }} value={assign.towhom} onChange={(e) => props.handleAssignChange(index, e)} name="towhom" required >
                          <option>Choose Employee</option>
                         {selectuser.map((user)=> <option>{user.name}</option>)}
                          </select>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 pl-4 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Remarks</label>
                    <div className="col-sm-9">
                      <div className="input-group input-group-merge">
                        <span className="input-group-text"><BsFillChatLeftTextFill /></span>
                        <input type="text" className="form-control" style={{ borderLeft: 'none' }} value={assign.remark} onChange={(e) => props.handleAssignChange(index, e)} name="remark" required />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
{/* <div className="row justify-content-end">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
          </div> */}