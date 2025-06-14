const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URI)
module.exports=mongoose.connection;