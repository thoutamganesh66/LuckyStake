const express=require('express')
const app= express();
app.use(express.json());
app.listen(4000)
const userRounter=express.Router()
app.use('/user',userRounter)

let users=[
    {
        "name":"raju",
        "age":14,
    },
    {
        "name":"manu",
        "age":33,  
    },
    {
        "name":"mihan",
        "age":32,
    },
    {
        "name":"madhu",
        "age":21,
    },
]
userRounter.route('/')
.get(getUser)
.post(postUser)
userRounter.route('/:name').get(getElementByName)
userRounter.route('/:age').get(getElementByAge)

function getUser(req,res)
{
    res.json
        users
    
    
}
function postUser(req,res)
{
    let data=req.body;
    users.push(data);
    res.json(
        {
            Message: 'data inerted successfully'
        }
    )
    }   
function getElementByName(req,res)
{
    let id=req.params.name;
    console.log(id);
    var data={}
    users.forEach(user=>
        {   console.log(user)
            if(user.name == id){

                data=user;
                console.log(data);
            }
        
        })
    res.send(data);

}
function getElementByAge(req,res)
{
    let data=req.params.age;
    var user1={}
    users.forEach(user=>{
        if(user.age== data)
        {
            user1=user;
        }
    })
    res.send(user1)
}

