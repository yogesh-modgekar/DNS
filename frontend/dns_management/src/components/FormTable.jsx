
import React from 'react'
import "../App.css"
import { MdClose } from 'react-icons/md'

const FormTable = ({handleSubmit,handleOnChange,handleClose,rest})=>{
  return (
    <div className="addContainer">

    <form onSubmit={handleSubmit}>
      <div className='close-btn' onClick={handleClose}><MdClose/></div>

      <label htmlFor="A">A Record : </label>
      <input type="text" id='A' name='A' onChange={handleOnChange} value={rest.A}/>

      <label htmlFor="AAAA">AAAA Record : </label>
      <input type="text" id='AAAA' name='AAAA' onChange={handleOnChange} value={rest.AAAA}/>

      <label htmlFor="CNAME">CNAME Record : </label>
      <input type="text" id='CNAME' name='CNAME' onChange={handleOnChange} value={rest.CNAME} />

      <label htmlFor="MX">MX Record : </label>
      <input type="text" id='MX' name='MX' onChange={handleOnChange} value={rest.MX} />

      <label htmlFor="NS">NS Record</label>
      <input type="NS" id='NS' name='NS' onChange={handleOnChange} value={rest.NS}/>

      <label htmlFor="PTR">PTR Record</label>
      <input type="text" id='PTR' name='PTR' onChange={handleOnChange} value={rest.PTR}/>

      <label htmlFor="SOA">SOA Record : </label>
      <input type="text" id='SOA' name='SOA' onChange={handleOnChange} value={rest.SOA}/>

      <label htmlFor="SRV">SRV Record : </label>
      <input type="text" id='SRV' name='SRV' onChange={handleOnChange} value={rest.SRV}/>

      <label htmlFor="TXT">TXT Record : </label>
      <input type="text" id='TXT' name='TXT' onChange={handleOnChange} value={rest.TXT}/>

      <label htmlFor="DNSSEC">DNSSEC Record</label>
      <input type="text" id='DNSSEC' name='DNSSEC' onChange={handleOnChange} value={rest.DNSSEC} />

      <button className='btn'>Submit</button>
    </form>
  </div>
  )
}

export default FormTable