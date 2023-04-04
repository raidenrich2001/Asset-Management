import React, { useState } from 'react'
import './Form.css';
import { BsFillLaptopFill, BsArchiveFill } from "react-icons/bs";
import { TbBoxModel } from "react-icons/tb";
import { AiOutlineNumber } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa';
import { BiBarcodeReader, BiRupee } from 'react-icons/bi';
export default function AddAsset(props) {


  return (
    <div className="container-fluid">
      <div class="row" id='overflowtry'>
        

     {props.addAsset.map((add,index) => 
     <div class="col-lg-6">
          <div class="card shadow mb-4">
          <div class="card-header d-flex flex-row py-1 justify-content-between">
            <h6 class="m-0 font-weight-bold py-2 text-primary">Add Asset {index+1}</h6>
            <button className='btn btn-light px-2 pt-1' style={{color:'#ff5f5f',border:'none'}}onClick={() => props.deleteAdd(index)} ><FaTrash style={{color:'#e74a4b'}}/></button>
        </div>
        <div className="card-body">
              <form className='row'>
                <div className='col-6'>
                <div className="row mb-1">
                  <label className="col-sm-12 text-dark col-form-label small-font-size" htmlFor="basic-icon-default-fullname" >Asset Brand</label>
                  <div className="col-sm-12">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><BsFillLaptopFill /></span>
                      <input type="text" className="form-control" value= {add.brand} onChange={(e) => props.handleAddChange(index,e)} style={{ borderLeft: 'none' }} name="brand" required={true} />
                    </div>
                  </div>
                </div>
                
                <div className="row mb-1">
                  <label className="col-sm-12 text-dark col-form-label" htmlFor="basic-icon-default-company">Asset Type</label>
                  <div className="col-sm-12">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-company2" className="input-group-text"><BsArchiveFill /></span>
                      <input type="text" style={{ borderLeft: 'none' }} value= {add.model} onChange={(e) => props.handleAddChange(index,e)} name="model" className="form-control" required={true} />
                    </div>
                  </div>
                </div>
                
                <div className="row mb-1">
                  <label className="col-sm-12 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Asset Model</label>
                  <div className="col-sm-12">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><TbBoxModel /></span>
                      <input type="text" className="form-control" name="type" value= {add.type} onChange={(e) => props.handleAddChange(index,e)} style={{ borderLeft: 'none' }} required={true} />
                    </div>
                  </div>
                </div>
                </div>
                <div className='col-6'>
                <div className="row mb-1">
                  <label className="col-sm-12 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Asset Serial No</label>
                  <div className="col-sm-12">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><AiOutlineNumber /></span>
                      <input type="text" className="form-control" name="serialno" value= {add.serialno} onChange={(e) => props.handleAddChange(index,e)} style={{ borderLeft: 'none' }} required={true} />
                    </div>
                  </div>
                </div>
                <div className="row mb-1">
                  <label className="col-sm-12 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Asset Value</label>
                  <div className="col-sm-12">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><BiRupee /></span>
                      <input type="number" min="0" className="form-control" name="worth" value= {add.worth} onChange={(e) => props.handleAddChange(index,e)} style={{ borderLeft: 'none' }} required={true} onInput={(e) => e.target.value = e.target.value.slice(0, 12)}/>
                    </div>
                  </div>
                </div>
                <div className="row mb-1">
                  <label className="col-sm-12 text-dark col-form-label" htmlFor="basic-icon-default-fullname">Asset ID</label>
                  <div className="col-sm-12">
                    <div className="input-group input-group-merge">
                      <span className="input-group-text"><BiBarcodeReader/></span>
                      <input type="text" className="form-control" name="assetID" value= {add.assetID} onChange={(e) => props.handleAddChange(index,e)} style={{ borderLeft: 'none' }} required={true}/>
                    </div>
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
