import { useState, useEffect } from 'react';
import './Dashboard.css'
import { BsArchiveFill, BsFillCalendar2DayFill, BsFillChatLeftTextFill, BsFillLaptopFill, BsGear } from "react-icons/bs";
import { GiCrackedDisc, GiTimeTrap } from "react-icons/gi";
import { BiBarcodeReader, BiRupee } from "react-icons/bi";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import { SlClose } from "react-icons/sl";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Modal from 'react-modal';
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineCloseCircle, AiOutlineNumber } from 'react-icons/ai';
import { TbBoxModel } from 'react-icons/tb';
import { MdOutlineAssignmentInd } from 'react-icons/md';
import Swal from 'sweetalert2';
import nodatablue from './img/nodatablue.svg';
import nodatagreen from './img/nodatagreen.svg';
import nodatacyan from './img/nodatacyan.svg';
import nodatared from './img/nodatared.svg';

function Dashboard(props) {
  const [availableAsset, setAvailableAsset] = useState([])
  const [assetPossession, setAssetPossession] = useState([])
  const [assetworth, setAssetworth] = useState([])
  const [idleAssets, setIdleAssets] = useState([])
  const [damagedAssets, setDamagedAsset] = useState([])
  const [assetlength, setAssetLength] = useState()
  const [assignlength, setAssignlength] = useState()
  const [idleCount, setIdleCount] = useState()
  const [damagedCount, setDamagedCount] = useState()
  const [show, setShow] = useState('Asset')
  const [assetpage, setAssetPage] = useState(0)
  const [assignpage, setAssignPage] = useState(0)
  const [idlepage, setIdlePage] = useState(0)
  const [damagedpage, setDamagedPage] = useState(0)
  const pageAssetCount = Math.ceil(assetlength / 10);
  const pageAssignCount = Math.ceil(assignlength / 10);
  const pageIdleCount = Math.ceil(idleCount / 10);
  const pageDamagedCount = Math.ceil(damagedCount / 10);
  const [modalassetIsOpen, setassetIsOpen] = useState(false);
  const [modalassignIsOpen, setassignIsOpen] = useState(false);
  const [tempAssignSerialno, setTempAssignSerialno] = useState('')
  const [tempSerialno, setTempSerialno] = useState('');
  const [tempAssetID, setTempAssetID] = useState('')
  const [tempAsset, setTempAsset] = useState([])
  const [oneAsset, setOneAsset] = useState([]);
  const [oneAssign, setOneAssign] = useState([]);
  const [deleter, setDeleter] = useState();
  const [searchedAssetDocument, setSearchedAssetDocument] = useState([]);
  const [searchedAssignDocument, setSearchedAssignDocument] = useState([]);
  const [searchedIdleDocument, setSearchedIdleDocument] = useState([]);
  const [searchedDamagedDocument, setSearchedDamagedDocument] = useState([]);
  const [showQR, setShowQR] = useState('')
  const [selectuser, setSelectuser] = useState([])
  let newAssetOffset, newAssignOffset, newIdleOffset, newDamagedOffset;

  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassetlimited?page=${assetpage}`).then((res) => setAvailableAsset(res.data)) }
    , [assetpage, deleter, oneAsset, show])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassignassetlimited?page=${assignpage}`).then((res) => setAssetPossession(res.data)) }
    , [assignpage, deleter, oneAssign, show])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallidleassetlimited?page=${idlepage}`).then((res) => setIdleAssets(res.data)) }
    , [idlepage, deleter, assetpage, show])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getalldamagedassetlimited?page=${damagedpage}`).then((res) => setDamagedAsset(res.data)) }
    , [damagedpage, deleter, assetpage, show])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassetusingsearch/${props.getsearchvalue}`).then((res) => setSearchedAssetDocument(res.data)) }
    , [props.getsearchvalue])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassignusingsearch/${props.getsearchvalue}`).then((res) => setSearchedAssignDocument(res.data)) }
    , [props.getsearchvalue])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallidleusingsearch/${props.getsearchvalue}`).then((res) => setSearchedIdleDocument(res.data)) }
    , [props.getsearchvalue])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getalldamagedusingsearch/${props.getsearchvalue}`).then((res) => setSearchedDamagedDocument(res.data)) }
    , [props.getsearchvalue])

  useEffect(() => { axios.get(`http://172.16.0.100:3005/getalluser`).then((res) => setSelectuser(res.data)) }, [oneAssign])


  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassetlength`).then((res) => setAssetLength(res.data)) }
    , [deleter, assetpage, tempSerialno])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassignassetlength`).then((res) => setAssignlength(res.data)) }
    , [deleter, assignpage, tempSerialno])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallidleassetlength`).then((res) => setIdleCount(res.data)) }
    , [deleter, idlepage, tempSerialno])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getdamagelength`).then((res) => setDamagedCount(res.data)) }
    , [deleter, damagedpage, tempSerialno])

  useEffect(() => { axios.get(`http://172.16.0.100:3005/getoneassetusingserialno/${tempSerialno}`).then((res) => { setOneAsset(res.data) }) }
    , [tempSerialno, tempAssetID, modalassetIsOpen, show])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getoneassignusingserialno/${tempAssignSerialno}`).then((res) => setOneAssign(res.data)) }
    , [tempAssignSerialno, modalassetIsOpen, availableAsset])
  useEffect(() => { axios.get(`http://172.16.0.100:3005/getallassetworth`).then((res) => setAssetworth(res.data)) }
    , [assetpage, deleter, tempSerialno])


  const handleAssetPageClick = (event) => {
    newAssetOffset = (event.selected * 1) % assetlength;
    setAssetPage(newAssetOffset);
  };

  const handleAssignPageClick = (event) => {
    newAssignOffset = (event.selected * 1) % assignlength;
    setAssignPage(newAssignOffset);
  };

  const handleIdlePageClick = (event) => {
    newIdleOffset = (event.selected * 1) % idleCount;
    setIdlePage(newIdleOffset);
  };

  const handleDamagedPageClick = (event) => {
    newDamagedOffset = (event.selected * 1) % damagedCount;
    setDamagedPage(newDamagedOffset);
  };



  //edit modal
  function openAssetModal(serialno, getasset) {
    setassetIsOpen(true);
    setTempSerialno(serialno);
    setTempAsset(getasset);
    setTempAssetID(getasset.assetID)
  }
  function openAssignModal(serialno) {
    setassignIsOpen(true);
    setTempAssignSerialno(serialno);
  }
  function closeModal() {
    setassetIsOpen(false);
    setassignIsOpen(false);
    setTempAssignSerialno('');
    setTempSerialno('');
    setOneAssign([]);
    setOneAsset([]);
    setTempAsset([]);
  }
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

  function handleAddChange(event) {
    let values = oneAsset;
    values[event.target.name] = event.target.value;
    setOneAsset(values);
  }

  function handleAssignChange(event, getserialno) {
    let values = oneAssign;
    values[event.target.name] = event.target.value;
    if (getserialno) { values['serialno'] = getserialno; }
    setOneAssign(values);
  }

  function editAsset() {
    if (oneAsset.brand && oneAsset.serialno && oneAsset.model && oneAsset.type && oneAsset.worth && oneAsset.assetID) {
      axios.patch(`http://172.16.0.100:3005/editoneasset/${tempSerialno}/${tempAssetID}`, oneAsset).then((res) => res.data.message === 'Updated Successfully' ? axios.patch(`http://172.16.0.100:3005/editoneassinassetforassetediting/${tempSerialno}`, { serialno: oneAsset.serialno, assetID: oneAsset.assetID }).then((res) => alert(res.data.message)) : alert(res.data.message));
      axios.patch(`http://172.16.0.100:3005/editoneidleasset/${tempSerialno}/${tempAssetID}`, oneAsset).then((res) => alert(res.data.message)).then(() => { closeModal() });
    }
    else {
      alert('Fill all fileds')
    }

  }

  function editAssign(serialno) {
      axios.patch(`http://172.16.0.100:3005/editoneassinasset/${tempAssignSerialno}`, oneAssign).then(() => alert('updated'));
      availableAsset.filter((filterIdle) => filterIdle.serialno === tempAssignSerialno).map((idleChange) => {
        axios.post('http://172.16.0.100:3005/idleasset', idleChange)
        .then(() => axios.delete(`http://172.16.0.100:3005/deleteoneidleasset/${serialno}`))
      })
  }
  //edit modal

  //delete
  function deleteAssetAndAssignAndIdleAndDamaged(serialno) {

    Swal.fire({
      title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Do you want to delete this asset?` + "</h5>",
      customClass: { denyButton: 'btn btn-danger px-4 py-1 ', confirmButton: 'btn btn-primary px-4 py-1 ' },
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
      // buttonsStyling: false
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`http://172.16.0.100:3005/deleteoneasset/${serialno}`).then(() => setDeleter(result))
        axios.delete(`http://172.16.0.100:3005/deleteoneassignasset/${serialno}`).then(() => setDeleter(result))
        axios.delete(`http://172.16.0.100:3005/deleteoneidleasset/${serialno}`).then(() => setDeleter(result))
        axios.delete(`http://172.16.0.100:3005/deleteoneDamagedasset/${serialno}`).then(() => setDeleter(result))
        Swal.fire({ timer: 1500, timerProgressBar: true, customClass: { confirmButton: 'btn btn-warning px-4 py-1', icon: 'red' }, icon: 'success', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Deleted this asset in all table` + "</h5>", buttonsStyling: false })
      }
    })
  }
  function deletedamaged(serialno) {
    axios.delete(`http://172.16.0.100:3005/deleteoneDamagedasset/${serialno}`).then(() => setDeleter(serialno)).then(() => Swal.fire({ timer: 1500, timerProgressBar: true, customClass: { confirmButton: 'btn btn-warning px-4 py-1', icon: 'red' }, icon: 'success', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Removed From Assets Damaged` + "</h5>", buttonsStyling: false }))
  }

  function deleteAssignAndAddIdle(serialno) {
    axios.get(`http://172.16.0.100:3005/getoneassetusingserialno/${serialno}`).then((res) => Swal.fire({
      title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Do you want to delete this assigned assets?` + "</h5>",
      customClass: { denyButton: 'btn btn-danger px-4 py-1 ', confirmButton: 'btn btn-primary px-4 py-1 ' },
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then((result) => {

      if (result.isConfirmed) {
        axios.delete(`http://172.16.0.100:3005/deleteoneassignasset/${serialno}`).then(() => setDeleter(serialno))
        axios.post('http://172.16.0.100:3005/idleasset', res.data)
        Swal.fire({ timer: 1500, timerProgressBar: true, customClass: { confirmButton: 'btn btn-warning px-4 py-1', icon: 'red' }, icon: 'success', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + `Deleted this assigned assets` + "</h5>", buttonsStyling: false })
      }
    }))
  }
  //delete


  function Addtodamage() {
    axios.post('http://172.16.0.100:3005/damagedassset', tempAsset)
      .then((res) => res.data.message === 'Added to Damaged Assets' ?
       Swal.fire({ timer: 1500, timerProgressBar: true, customClass: { confirmButton: 'btn btn-warning px-4 py-1', icon: 'red' }, icon: 'warning', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + res.data.message + "</h5>", buttonsStyling: false }) 
      : 
      Swal.fire({ timer: 1500, timerProgressBar: true, customClass: { confirmButton: 'btn btn-danger px-4 py-1', icon: 'red' }, icon: 'error', title: "<h5 style='color:black;font-size:20px';font-family:'Open Sans'>" + res.data.message + "</h5>", buttonsStyling: false }))
  }

  function sendtocheck(e) {
    return availableAsset.find((fil => { return e.split(/\s/).includes(fil.serialno) })).serialno
  }

  function convertToInternationalCurrencySystem(labelValue) {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

      ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(1) + " " + "Billion"
      // Six Zeroes for Millions 
      : Math.abs(Number(labelValue)) >= 1.0e+6

        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(1) + " " + "Million"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3

          ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + " " + "K"

          : Math.abs(Number(labelValue));
  }

  let formattedNumber = assetworth.reduce((a, v) => { return Number(a) + Number(v) }, 0)
  // convertToInternationalCurrencySystem(formattedNumber)

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4" id='hoverTable4'  >
          <div className="card border-left-warning shadow h-100 py-2"  >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Assets Worth </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{convertToInternationalCurrencySystem(formattedNumber)}</div>
                </div>
                <div className="dropdown no-arrow">
                  <a className="col-auto dropdown-toggle" href='#' role="button" id="dropdownMenuLink" data-toggle="dropdown">
                    <i className="fas fa-2x text-warning" ><BiRupee /></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in">
                    {/* <div className="dropdown-divider" /> */}
                    <h6 style={{ padding: "8px 10px 0px 10px" }}>{new Intl.NumberFormat().format(formattedNumber)}<BiRupee /> </h6>
                    {/* <div className="dropdown-divider" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-6 mb-4" id='hoverTable1' onClick={(e) => { setShow('Asset'); setAssetPage(0) }}>
          <div className="card border-left-primary shadow h-100 py-2"  >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Assets Available </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{assetlength}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-md-6 mb-4" id='hoverTable2' onClick={(e) => { setShow('Possessions'); setAssignPage(0) }}>
          <div className="card border-left-success shadow h-100 py-2" >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Working Assets</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{assignlength}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-2x text-success" ><BsGear /></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-2 col-md-6 mb-4" id='hoverTable3' onClick={(e) => { setShow('Idle'); setIdlePage(0) }}>
          <div className="card border-left-info shadow h-100 py-2"  >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Idle Assets </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{idleCount}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-2x text-info" ><GiTimeTrap /></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4" id='hoverTable5' onClick={(e) => { setShow('Damaged'); setDamagedPage(0) }}>
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                    Assets Damaged</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{damagedCount}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-2x text-danger" ><GiCrackedDisc /></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      {/* <div className="row"> */}
      {/* Area Chart */}
      {/* <div className="col-xl-12 col-lg-7"> */}
      <div className="card shadow mb-4">
        {/* Card Header - Dropdown */}

        <div className="card-header py-1 d-flex flex-row align-items-center justify-content-between">

          <h6 className="m-0 mx-3 pt-2 font-weight-bold text-primary">{show === 'Asset' && <h6 className="m-0 font-weight-bold text-primary">All Available Assets<p className="font-weight-lighter text-dark py-1">Deleting in this table will affect in working assets, idle assets and damaged assets.</p></h6>}
            {show === 'Possessions' && <h6 className="m-0 font-weight-bold text-success">All Assets Possessions<p className="font-weight-lighter text-dark py-1">Deleting in this table will affect in idle assets.</p></h6>}
            {show === 'Idle' && <h6 className="m-0 font-weight-bold text-info">All Idle Assets<p className="font-weight-lighter text-dark py-1">Deleting in this table will affect in available assets and damaged assets.</p></h6>}
            {show === 'Damaged' && <h6 className="m-0 font-weight-bold text-danger">All Damaged Assets<p className="font-weight-lighter text-dark py-1">This table is independent and will not affect in any other table.</p></h6>}</h6>

          <div className="dropdown no-arrow">
            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" >
              <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in">
              <div className="dropdown-header">Toggle Table</div>
              {/* <a className="dropdown-item" href="#">Action</a> */}
              <div className="dropdown-divider" />
              <a className="dropdown-item" onClick={(e) => { setShow('Asset'); setAssetPage(0) }} style={{ cursor: 'pointer' }}>Asset Available</a>
              <a className="dropdown-item" onClick={(e) => { setShow('Possessions'); setAssignPage(0) }} style={{ cursor: 'pointer' }}>Assets Possessions</a>
              <a className="dropdown-item" onClick={(e) => { setShow('Idle'); setIdlePage(0) }} style={{ cursor: 'pointer' }}>Idle Assets</a>
              <a className="dropdown-item" onClick={(e) => { setShow('Damaged'); setDamagedPage(0) }} style={{ cursor: 'pointer' }}>Assets Damaged</a>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="card-body" id='table-card'>
          <div className="table-responsive" style={{ height: "55vh", fontSize: '15px' }} id='overflowtry'>
            <table className="table text-dark table-bordered table-hover" id="dataTable" width="100%" >
              {show === 'Asset' &&
                <>
                  <thead >
                    <tr className='text-center'>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>SerialNo</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>AssetID</th>
                      <th>QR Code</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* .filter((asset) => searchthis(asset)) */}
                    {props.getsearchvalue.length === 0 ?
                      availableAsset.length !== 0 ? availableAsset.map((print) =>
                        <tr className='text-center'>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.brand}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.model}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.serialno}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.type}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.worth}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.assetID}</td>
                          <td>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssetAndAssignAndIdleAndDamaged(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>) : <tr style={{ height: '50vh' }} id='donthover'><td className='text-center' colSpan='8'><img src={nodatablue}></img><h5 className='text-gray-500 ml-4'>No Asset Found</h5></td></tr>
                      :
                      searchedAssetDocument.map((print) =>
                        <tr className='text-center'>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.brand}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.model}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.serialno}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.type}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.worth}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.assetID}</td>
                          <td>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssetAndAssignAndIdleAndDamaged(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>

                      )
                    }
                  </tbody>
                </>
              }
              {/* .filter((possess) => searchthis(possess)) */}
              {show === 'Possessions' && <>
                <thead>
                  <tr className='text-center'>
                    <th>Issued On</th>
                    <th>Assigned Asset</th>
                    <th>Employee</th>
                    <th>Remark</th>
                    <th>QR Code</th>
                    <th >Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {props.getsearchvalue.length === 0 ?
                    assetPossession.length !== 0 ? assetPossession.map((print) =>
                      <>
                        <tr>
                          <td onClick={() => openAssignModal(print.serialno)}>{print.issueddate}</td>
                          <td onClick={() => openAssignModal(print.serialno)} className='text-wrap'>{print.assignasset}</td>
                          <td onClick={() => openAssignModal(print.serialno)}>{print.towhom}</td>
                          <td onClick={() => openAssignModal(print.serialno)}>{print.remark}</td>
                          <td className='text-center'>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssignAndAddIdle(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>

                      </>
                    ) : <tr style={{ height: '50vh' }} id='donthover'><td className='text-center' colSpan='6'><img src={nodatagreen}></img><h5 className='text-gray-500 ml-4'>No Asset Found</h5></td></tr>
                    :
                    searchedAssignDocument.map((print) =>
                      <tr className='text-center'>
                        <td onClick={() => openAssignModal(print.serialno)}>{print.issueddate}</td>
                        <td onClick={() => openAssignModal(print.serialno)} className='text-wrap'>{print.assignasset}</td>
                        <td onClick={() => openAssignModal(print.serialno)}>{print.towhom}</td>
                        <td onClick={() => openAssignModal(print.serialno)}>{print.remark}</td>
                        <td className='text-center'>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                        <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssignAndAddIdle(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                      </tr>)
                  }
                </tbody>
              </>}

              {show === 'Idle' &&
                <>
                  <thead >
                    <tr className='text-center'>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>SerialNo</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>AssetID</th>
                      <th>QR Code</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.getsearchvalue.length === 0 ?
                      idleAssets.length !== 0 ? idleAssets.map((print) =>
                        <tr className='text-center'>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.brand}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.model}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.serialno}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.type}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.worth}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.assetID}</td>
                          <td>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssetAndAssignAndIdleAndDamaged(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>) : <tr style={{ height: '50vh' }} id='donthover'><td className='text-center' colSpan='8'><img src={nodatacyan}></img><h5 className='text-gray-500 ml-4'>No Asset Found</h5></td></tr>
                      :
                      searchedIdleDocument.map((print) =>
                        <tr className='text-center'>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.brand}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.model}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.serialno}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}>{print.type}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.worth}</td>
                          <td onClick={() => openAssetModal(print.serialno, print)}> {print.assetID}</td>
                          <td>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssetAndAssignAndIdleAndDamaged(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>

                      )}

                  </tbody>
                </>}

              {show === 'Damaged' &&
                <>
                  <thead >
                    <tr className='text-center'>
                      <th>Brand</th>
                      <th>Model</th>
                      <th>SerialNo</th>
                      <th>Type</th>
                      <th>Value</th>
                      <th>AssetID</th>
                      <th>QR Code</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.getsearchvalue.length === 0 ?
                      damagedAssets.length !== 0 ? damagedAssets.map((print) =>
                        <tr className='text-center'>
                          <td>{print.brand}</td>
                          <td>{print.model}</td>
                          <td>{print.serialno}</td>
                          <td>{print.type}</td>
                          <td> {print.worth}</td>
                          <td> {print.assetID}</td>
                          <td>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deletedamaged(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>) : <tr style={{ height: '50vh' }} id='donthover'><td className='text-center ' colSpan='8'><img src={nodatared}></img><h5 className='text-gray-500 ml-4'>No Asset Found</h5></td></tr>
                      :
                      searchedDamagedDocument.map((print) =>
                        <tr className='text-center'>
                          <td>{print.brand}</td>
                          <td>{print.model}</td>
                          <td>{print.serialno}</td>
                          <td>{print.type}</td>
                          <td> {print.worth}</td>
                          <td> {print.assetID}</td>
                          <td>{showQR !== print._id ? <button className='btn btn-primary py-0 px-3' onClick={() => setShowQR(print._id)}>View QR</button> : <><img onClick={() => setShowQR('')} src={print.qrcode}></img><a className='btn btn-primary pb-1 pt-0 px-2 mx-2' href={print.qrcode} download><FaFileDownload /></a></>}</td>
                          <td className='text-center'><button className='btn btn-white py-0 pb-1 px-2' onClick={() => deleteAssetAndAssignAndIdleAndDamaged(print.serialno)}><FaTrash style={{ color: '#e74a3b' }} /></button></td>
                        </tr>
                      )}
                  </tbody>
                </>}

            </table>
          </div>
          {/* <React */}
          {show === 'Asset' && <div
            style={{
              padding: `10px 0px 0px 0px`,
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            }}
            className='d-flex flex-row justify-content-center'

          >
            <ReactPaginate
              activeClassName={'item lolAssetactive '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              marginPagesDisplayed={2}
              nextClassName={"item next "}
              nextLabel={<AiFillCaretRight style={{ fontSize: 18, width: 20, color: '#858796' }}></AiFillCaretRight>}
              onPageChange={handleAssetPageClick}
              pageCount={pageAssetCount}
              pageClassName={'item pagination-page '}
              pageRangeDisplayed={2}
              // onPageActive = {newAssetOffset}
              previousClassName={"item previous"}
              previousLabel={<AiFillCaretLeft style={{ fontSize: 18, width: 20, color: '858796' }}></AiFillCaretLeft>}
            />
          </div>}

          {show === 'Possessions' && <div
            style={{
              padding: `10px 0px 0px 0px`,
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            }}
            className='d-flex flex-row justify-content-center'

          >
            <ReactPaginate
              activeClassName={'item lolAssignactive '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              marginPagesDisplayed={2}
              nextClassName={"item next "}
              nextLabel={<AiFillCaretRight style={{ fontSize: 18, width: 20, color: '#858796' }}></AiFillCaretRight>}
              onPageChange={handleAssignPageClick}
              pageCount={pageAssignCount}
              pageClassName={'item pagination-page '}
              // onPageActive = {newAssignOffset}
              pageRangeDisplayed={2}
              previousClassName={"item previous"}
              previousLabel={<AiFillCaretLeft style={{ fontSize: 18, width: 20, color: '858796' }}></AiFillCaretLeft>}
            />
          </div>}

          {show === 'Idle' && <div
            style={{
              padding: `10px 0px 0px 0px`,
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            }}
            className='d-flex flex-row justify-content-center'

          >
            <ReactPaginate
              activeClassName={'item lolIdleactive '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              marginPagesDisplayed={2}
              nextClassName={"item next "}
              nextLabel={<AiFillCaretRight style={{ fontSize: 18, width: 20, color: '#858796' }}></AiFillCaretRight>}
              onPageChange={handleIdlePageClick}
              pageCount={pageIdleCount}
              pageClassName={'item pagination-page '}
              // onPageActive = {newIdleOffset}
              pageRangeDisplayed={2}
              previousClassName={"item previous"}
              previousLabel={<AiFillCaretLeft style={{ fontSize: 18, width: 20, color: '858796' }}></AiFillCaretLeft>}
            />
          </div>
          }

          {show === 'Damaged' && <div
            style={{
              padding: `10px 0px 0px 0px`,
              boxSizing: 'border-box',
              width: '100%',
              height: '100%',
            }}
            className='d-flex flex-row justify-content-center'

          >
            <ReactPaginate
              activeClassName={'item lolDamageactive '}
              breakClassName={'item break-me '}
              breakLabel={'...'}
              containerClassName={'pagination'}
              disabledClassName={'disabled-page'}
              marginPagesDisplayed={2}
              nextClassName={"item next "}
              nextLabel={<AiFillCaretRight style={{ fontSize: 18, width: 20, color: '#858796' }}></AiFillCaretRight>}
              onPageChange={handleDamagedPageClick}
              pageCount={pageDamagedCount}
              pageClassName={'item pagination-page '}
              // onPageActive = {newDamagedOffset}
              pageRangeDisplayed={2}
              previousClassName={"item previous"}
              previousLabel={<AiFillCaretLeft style={{ fontSize: 18, width: 20, color: '858796' }}></AiFillCaretLeft>}
            />
          </div>}


        </div>

        {(show === 'Asset' || show === 'Idle') && <Modal
          isOpen={modalassetIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className=' d-flex flex-row justify-content-between'>
            <h4 style={{ fontFamily: 'Segoe UI', fontSize: '16px' }} className='text-center font-weight-bold pt-2'>EDIT ASSET</h4>
            <button className='btn mb-4 pt-1' style={{ fontSize: '17px', color: 'red' }} onClick={closeModal}><SlClose /></button>
          </div>
          <form style={{ fontSize: '15px' }}>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label small-font-size" htmlFor="basic-icon-default-fullname" > Brand</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BsFillLaptopFill /></span>
                  <input type="text" className="form-control" defaultValue={oneAsset.brand} onInput={(e) => handleAddChange(e)} style={{ borderLeft: 'none' }} name="brand" required />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-company"> Type</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-company2" className="input-group-text"><BsArchiveFill /></span>
                  <input type="text" style={{ borderLeft: 'none' }} defaultValue={oneAsset.model} onInput={(e) => handleAddChange(e)} name="model" className="form-control" required />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Model</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><TbBoxModel /></span>
                  <input type="text" className="form-control" name="type" defaultValue={oneAsset.type} onInput={(e) => handleAddChange(e)} style={{ borderLeft: 'none' }} required />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Serial Number</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><AiOutlineNumber /></span>
                  <input type="text" className="form-control" name="serialno" defaultValue={oneAsset.serialno} onInput={(e) => handleAddChange(e)} style={{ borderLeft: 'none' }} required />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname"> Value</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BiRupee /></span>
                  <input type="number" min="0" className="form-control" name="worth" defaultValue={oneAsset.worth} onInput={(e) => handleAddChange(e)} style={{ borderLeft: 'none' }} required />
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Asset ID</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BiBarcodeReader /></span>
                  <input type="text" className="form-control" name="assetID" defaultValue={oneAsset.assetID} onInput={(e) => handleAddChange(e)} style={{ borderLeft: 'none' }} required />
                </div>
              </div>
            </div>
            <div className='d-flex flex-row-reverse justify-content-start mt-3'>
              <button type='button' className='btn btn-primary mx-2 py-1' onClick={() => editAsset()}>Edit</button>
              <button type='button' className='btn btn-danger py-1' onClick={() => { Addtodamage() }}>Add to Damaged Asset</button>
            </div>
          </form>
        </Modal>
        }

        {show === 'Possessions' && <Modal
          isOpen={modalassignIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className=' d-flex flex-row justify-content-between'>
            <h4 style={{ fontFamily: 'Segoe UI', fontSize: '16px' }} className='text-center font-weight-bold pt-2'>EDIT ASSIGNED ASSET</h4>
            <button className='btn mb-4 pt-1' style={{ fontSize: '17px', color: 'red' }} onClick={closeModal}><SlClose /></button>
          </div>
          <form style={{ fontSize: '15px' }}>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label small-font-size" htmlFor="basic-icon-default-fullname" >Issued Date</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BsFillCalendar2DayFill /></span>
                  <input type="date" style={{ borderLeft: 'none' }} className="form-control" defaultValue={oneAssign.issueddate} onChange={(e) => handleAssignChange(e)} name="issueddate" required />
                </div>
              </div>
            </div>

            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-company">Assign</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span id="basic-icon-default-company2" className="input-group-text"><BsFillLaptopFill /></span>
                  <select className="form-select" defaultValue={oneAssign.assignasset} onChange={(e) => { handleAssignChange(e, sendtocheck(e.target.value)) }} name="assignasset">
                    {/* <option>Choose value</option> */}
                    <option value={oneAssign.assignasset}>{oneAssign.assignasset}</option>
                    {idleAssets?.map((print) => <option value={`AssetID : ${print.assetID} / SerialNo : ${print.serialno}`}>AssetID : {print.assetID} / SerialNo : {print.serialno}</option>)}
                  </select>

                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">To Whom</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><MdOutlineAssignmentInd /></span>
                  <select className="form-select" defaultValue={oneAssign.towhom} onChange={(e) => { handleAssignChange(e) }} name="towhom">
                    <option value={oneAssign.towhom}>{oneAssign.towhom}</option>
                    {/* <option>Choose Employee</option> */}
                    {selectuser?.filter((user) => oneAssign.towhom !== user.name).map((user) => <option value={user.name}>{user.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <label className="col-sm-3 col-form-label" htmlFor="basic-icon-default-fullname">Remarks</label>
              <div className="col-sm-9">
                <div className="input-group input-group-merge">
                  <span className="input-group-text"><BsFillChatLeftTextFill /></span>
                  <input type="text" className="form-control" name="remark" defaultValue={oneAssign.remark} onInput={(e) => handleAssignChange(e)} style={{ borderLeft: 'none' }} required />
                </div>
              </div>
            </div>
            <div className='d-flex flex-row justify-content-end mt-3'>
              <button type='button' className='btn btn-primary mx-2 py-1' onClick={() => editAssign(oneAssign.serialno)}>Edit</button>
              {/* <button type='button' className='btn btn-danger py-1'>Add to Damaged Asset</button> */}
            </div>
          </form>
        </Modal>
        }

      </div>

    </div>


  );
}

export default Dashboard;