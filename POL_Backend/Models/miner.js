const mongoose=require('mongoose'); 
//const mod=require('../functions/minerfunctions');
const minerSchema= mongoose.Schema({
    name:{
        type:"String",
        required: true,
        unique: true,
    },
    stake:{
        type: Number,
        required: true,


    },
    reward:{
        type:Number,
        default:0

    },
    balance:{
        type: Number,
        default:0
    },
    BlocksMined:{
        type: Array,

         
    },
});
const userModel=mongoose.model('miner',minerSchema);
module.exports=userModel;