const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const deleteRouter=require('./routes/deleteRouter');
const uploadRouter=require('./routes/uploadRouter');
const db=require("./config/db");
const cardModel=require('./models/card-model');
dotenv.config();
const cors = require('cors');

const app=express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use("/api/delete",deleteRouter);
app.use("/upload",uploadRouter);


app.get("/api/users",async function(req,res){
    const users=await cardModel.find();
    res.json(users);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);