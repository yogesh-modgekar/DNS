
import './App.css';
import { MdClose } from "react-icons/md";
import { useEffect, useState } from 'react';
import axios from "axios"
import FormTable from './components/FormTable';

axios.defaults.baseURL = "http://localhost:8000"

function App() {

  const [addSection,setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false)
  const [formData,setFormData] = useState({
       A : "",
       AAAA : "",
       CNAME : "",
       MX : "",
       NS : "",
       PTR : "",
       SOA : "",
       SRV : "",
       TXT : "",
       DNSSEC : ""
  })
  const [formDataEdit,setFormDataEdit] = useState({
    A : "",
    AAAA : "",
    CNAME : "",
    MX : "",
    NS : "",
    PTR : "",
    SOA : "",
    SRV : "",
    TXT : "",
    DNSSEC : "",
    _id : ""
})
  const [dataList, setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value,name} = e.target 
    setFormData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data);
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
    }
  }

  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
    getFetchData()
  },[]);
  
  const handleDelete = async(id)=>{
    const data = await axios.delete('/delete/'+id);
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async(e)=>{
       e.preventDefault();
       const data = await axios.put('/update',formDataEdit);
       if(data.data.success){
        getFetchData();
        alert(data.data.message);
        setEditSection(false);
      }
  }

  const handleEditOnChange = async (e)=>{
    const {value,name} = e.target 
    setFormDataEdit((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleEdit = (ele)=>{
    setFormDataEdit(ele)
    setEditSection(true)
  }

  return (
    <>
       <h1>DNS Records :</h1>
       <div className="Container">
        <button className='btn btn-add' onClick={()=>{setAddSection(true)}}>ADD</button>

        {
          addSection && (
             <FormTable
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}
                handleClose={()=>setAddSection(false)}
                rest={formData}
             />
          )
      }
      {
        editSection && (
          <FormTable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleClose={()=>setEditSection(false)}
          rest={formDataEdit}
         />
        )
      }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Address Record</th>
                <th>AAAA Record</th>
                <th>CNAME Record</th>
                <th>MX Record</th>
                <th>NS Record</th>
                <th>PTR Record</th>
                <th>SOA Record</th>
                <th>SRV Record</th>
                <th>TXT Record</th>
                <th>DNSSEC Record</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {
                dataList[0] ? (
                dataList.map((ele)=>{
                  return(
                    <tr>
                      <td>{ele.A}</td>
                      <td>{ele.AAAA}</td>
                      <td>{ele.CNAME}</td>
                      <td>{ele.MX}</td>
                      <td>{ele.NS}</td>
                      <td>{ele.PTR}</td>
                      <td>{ele.SOA}</td>
                      <td>{ele.SRV}</td>
                      <td>{ele.TXT}</td>
                      <td>{ele.DNSSEC}</td>
                      <td>
                      <button className='btn btn-edit'onClick={()=>handleEdit(ele)}>Edit</button>
                      <button className='btn btn-delete' onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                      </td>
                    </tr>
                  )
                })) : (
                  <p style={{textAlign : 'center'}}>No Data Available</p>
                )
              }
            </tbody>
          </table>
        </div>
      

        </div> 
    </>
  )
}

export default App
