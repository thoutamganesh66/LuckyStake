const miner=require('../Models/miner')
var stake=0;
const registerminer=async function (req,res){
    {
        const dat=req.body;
        stake=req.body.stake;
        await miner.create(dat);
        res.json({
            message:"data inserted!!!"
        })
    }
}
const getminers=async function (req,res){
    {
        const data=await miner.find()
        res.json({
            data
        })
    }
}
module.exports={registerminer,getminers};