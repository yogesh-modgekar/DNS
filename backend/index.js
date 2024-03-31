
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8000;

mongoose.connect("mongodb://localhost:27017/dns")
.then(()=>{
    console.log('Connected to DataBase');
})
.catch((Error)=>{
    console.log(Error);
})

//schema
const schemaData = mongoose.Schema({
     A : String,
     AAAA : String,
     CNAME : String,
     MX : String,
     NS : Array,
     PTR : String,
     SOA : String,
     SRV : String,
     TXT : String,
     DNSSEC : String
},{timestamps : true})

//model
const dnsModel = mongoose.model('dnsrecords',schemaData);

//read record
//http://localhost:8000/
app.get("/",async(req,res)=>{
    const data = await dnsModel.find({})
    res.json({success : true, data : data});
})

//create record
//http://localhost:8000/create
app.post('/create', async(req,res)=>{
    console.log(req.body);
    const data = new dnsModel(req.body)
    await data.save();
    res.status(200).send({success : true, message : 'Record save successfully',data : data});
})

//update record
//http://localhost:8000/update
app.put('/update', async(req,res)=>{
    console.log(req.body);
    const{_id,...rest} = req.body
    const data = await dnsModel.updateOne({_id : _id},rest);
    res.status(200).send({success : true, message : 'Record updated successfully', data: data});
})

//delete record
//http://localhost:8000/delete
app.delete('/delete/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const data = await dnsModel.deleteOne({_id : id});
    res.status(200).send({success : true, message : 'Record deleted successfully', data: data});
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})