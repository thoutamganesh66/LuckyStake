const BlockModel=require('../Models/blocks')
const selected=require('../Models/tempdata')
const BlockDataModel=require('../Models/BlockData')
const countBlock=require('../Models/tempBlock');
const SHA256 = require("crypto-js/sha256");
const minermodel=require('../Models/miner')


let finalMiner;
let BlockDataToAdd;
let finalBlockCount;
let PreBlockHashToAdd;
//const { count } = require('../Models/blocks');

const root= BlockDataModel.find();
let blockCount=0;
const AddBlock=async function(req,res)
{
    await countBlock.updateOne(
        {id:"b172232"},
        {
            $inc:{count:1}
        },
        {new: true},
        //blockCount=count

    )
    //let remainingMiners=await selected.findOne({name:"lokya"})
    //const arr=remainingMiners.priorityMiners;


    let getBlockdata=await BlockDataModel.findOne({id:12345})
    BlockDataToAdd=getBlockdata.BlockData;
    const data=req.body;
   finalMiner=data.minerName;
    
   let getBlockCount=await countBlock.findOne({id:"b172232"})
   console.log(getBlockCount);
   finalBlockCount=getBlockCount.count;
   console.log(finalBlockCount);
   let getPreBlockHash=await BlockModel.findOne({BlockNumber:finalBlockCount-1})
        PreBlockHashToAdd=getPreBlockHash.BlockHash;

    console.log(finalMiner);
    console.log(PreBlockHashToAdd);
    console.log(finalBlockCount);
    console.log( BlockDataToAdd);


    const finalBlockHash=computeHash();

    function computeHash() {
        return SHA256(
            finalMiner +
            PreBlockHashToAdd +
            finalBlockCount +
            
            JSON.stringify(BlockDataToAdd)
        ).toString();
    }

    console.log(finalBlockHash);

    const newAddBlock=new BlockModel({
        data:BlockDataToAdd,
        miner:finalMiner,
        PreBlockHash:PreBlockHashToAdd,
        BlockNumber:finalBlockCount,
        timestamp:Date(),
        BlockHash:finalBlockHash


    })
    newAddBlock.save();
    
    const stakedata=await minermodel.findOne({name:finalMiner});
    let minerStake=stakedata.stake;
    let minerBalance=stakedata.balance
    minerStake=(minerStake+100+minerBalance)
    console.log(stakedata);
    await minermodel.updateOne({name:finalMiner},
       
        {
             $inc : {reward: 100 },
             $set:{balance:minerStake},
              $push: { BlocksMined:finalBlockCount } 
             
        }

        )
        await BlockDataModel.deleteMany({name:"lokya"});
    await selected.deleteMany({name:"lokya"});



    

    res.send("done!!!!")

    
}
console.log(blockCount);
//const fun=root.BlockData;
module.exports=AddBlock;
