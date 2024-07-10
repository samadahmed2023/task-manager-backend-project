const TaskModel = require('../models/TaskModel');

// create task
exports.createTask = (req, res) => {
    let reqBody=req.body;
    reqBody.email=req.headers["email"];
    TaskModel.create(reqBody,(err,data)=>{
        if(err){
            res.status(200).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// delete task
exports.deleteTask = (req,res)=>{
    let id = req.params.id;
    let Query = {_id:id};
    TaskModel.remove(Query,(err,data)=>{
        if (err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// update task status
exports.updateTaskStatus=(req,res)=>{
    let id = req.params.id;
    let status = req.params.status;
    let Query = {_id:id};
    let reqBody = {status:status};
    TaskModel.updateOne(Query,reqBody,(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}

// list task by status
exports.listTaskByStatus=(req,res)=>{
    let status = req.params.status;
    let email = req.headers["email"];
    TaskModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
            _id:1,title:1,description:1,status:1,
                createdDate:{
                $dateToString:{
                    date:"$createdDate",
                    format:"%d-%m-%Y"
                }
                }
            }}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else {
            res.status(200).json({status:"success",data:data})
        }
    })
}

// task status count
exports.taskStatusCount=(req,res)=>{
    let email=req.headers["email"];
    TaskModel.aggregate([
        {$match:{email:email}},
        {$group:{_id:"$status",sum:{$count:{}}}}
    ],(err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}





