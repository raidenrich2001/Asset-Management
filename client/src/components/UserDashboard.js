import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import photo from "./img/undraw_posting_photo.svg";
import "./UserDashboard.css";
import nodatablue from './img/nodatablue.svg';
import Modal from 'react-modal';
import { SlClose } from 'react-icons/sl';
import { BsArchiveFill, BsFillLaptopFill } from 'react-icons/bs';
import { TbBoxModel } from 'react-icons/tb';
import { AiOutlineNumber } from 'react-icons/ai';
import { BiBarcodeReader, BiRupee } from 'react-icons/bi';
export default function UserDashboard() {
  const {name} = useParams()
  const [data,setData] = useState([]);
  const [modalassetIsOpen, setassetIsOpen] = useState(false);
  const [tempSerialno,setTempSerialno] = useState([]);
  const [oneAsset,setOneAsset] = useState([])

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '10px 20px 20px 20px',
      border: 'none',
      boxShadow: '0 .15rem 1.75rem 0 rgba(58,59,69,.15)',
      width: '40%'
    },
  };

  useEffect(() => {
    axios.get(`http://172.16.0.100:3005/getoneuserassignedasset/${name}`).then((res)=> setData(res.data))},[])

    useEffect(() => { axios.get(`http://172.16.0.100:3005/getoneassetusingserialno/${tempSerialno}`).then((res) =>{ setOneAsset(res.data)}) }
    , [tempSerialno, modalassetIsOpen])

    function openAssetModal(serialno) {
      setassetIsOpen(true);
      setTempSerialno(serialno);
    }

    function closeModal() {
      setassetIsOpen(false);
      setTempSerialno('');
      setOneAsset([]);
    }

  return (
    <div className="container-fluid">

  {/* Illustrations */}
  <div className="card shadow mb-4">
    <div className="card-header pt-3 pb-0">
      <h6  className="m-0 font-weight-bold text-primary text-center ">ASSETS ASSIGNED FOR YOU</h6>
      <p >Here's the list of asset you've got...</p>
    </div>
    <div className="card-body">
      <div className="text-center">
        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: '25rem'}} src={photo} alt="..." />
      </div>
      <div className="table-responsive" id='overflowuser'>
            <table className="table text-dark table-bordered table-hover" id="dataTable" width="100%" >
            <thead className='font-weight-bold text-center'>
                  <td>Issued Date</td>
                  <td>Assign Asset</td>
                  <td>To Whom</td>
                  <td>Remarks</td>
              </thead>
              <tbody>
              {data.length !== 0 ? data.map((data) =>
                      <>
                        <tr>
                          <td className='text-center' onClick= {() => openAssetModal(data.serialno)}>{data.issueddate}</td>
                          <td className='text-center' onClick= {() => openAssetModal(data.serialno)}>{data.assignasset}</td>
                          <td className='text-center' onClick= {() => openAssetModal(data.serialno)}>{data.towhom}</td>
                          <td className='text-wrap' onClick= {() => openAssetModal(data.serialno)}>{data.remark}</td>
                          {/* <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssignID(print.serialno)}><FaTrash style={{color:'#e74a3b'}}/></button></td> */}
                        </tr>

                      </>
                    ) :<tr style={{height:'50vh'}} id='donthover'><td className='text-center' colSpan='6'><img src={nodatablue}></img><h4 className='text-gray-500 ml-4'>No Asset Found</h4></td></tr>}
           
              </tbody>

            </table>
            </div>
      {/* <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on
        unDraw →</a> */}
    </div>
    <Modal
          isOpen={modalassetIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className=' d-flex flex-row justify-content-between'>
            <h4 style={{ fontFamily: 'Segoe UI', fontSize: '16px' }} className='text-center font-weight-bold pt-2'>ASSIGNED ASSET</h4>
            <button className='btn mb-4 pt-1' style={{ fontSize: '17px', color: 'red' }} onClick={closeModal}><SlClose /></button>
          </div>
          <form style={{ fontSize: '15px' }}>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label small-font-size" htmlFor="basic-icon-default-fullname" > Brand</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BsFillLaptopFill/></span>
                  <h2 className='form-control'>{oneAsset.brand}</h2>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-company"> Type</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-company2" className="input-group-text"><BsArchiveFill/></span>
                  <h2 className='form-control'>{oneAsset.type}</h2>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Model</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><TbBoxModel/></span>
                  <h2 className='form-control'>{oneAsset.model}</h2>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Serial Number</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><AiOutlineNumber/></span>
                  <h2 className='form-control'>{oneAsset.serialno}</h2>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname"> Value</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BiRupee/></span>
                  <h2 className='form-control'>{oneAsset.worth}</h2>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Asset ID</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BiBarcodeReader/></span>
                  <h2 className='form-control'>{oneAsset.assetID}</h2>
                </div>
              </div>
            </div>
          </form>
        </Modal>
  </div>
</div>

  )
}
