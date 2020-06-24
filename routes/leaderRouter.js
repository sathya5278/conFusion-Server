const express=require('express');

const bodyParser=require('body-parser');

const Leaders = require('../models/leaders');

var authenticate = require('../authenticate');

const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req,res,next) =>{
   Leaders.find({})
   .then((leaders)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leaders);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Leaders.create(req.body)
   .then((leader)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leader)
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /leaders');
})
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Leaders.remove({})
   .then((leaders)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leaders)
   },(err)=>next(err))
   .catch((err)=>next(err));
});


leaderRouter.route('/:leaderId')
.get((req,res,next) =>{
   Leaders.findById(req.params.leaderId)
   .then((leader)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   res.statusCode=403;
    res.end('POST operation is not supported for /leader/' + req.params.leaderId);
})
.put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId)
    .then((leader)=>{
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Leaders.findByIdAndDelete(req.params.leaderId)
   .then((leader)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);
   },(err)=>next(err))
   .catch((err)=>next(err));
});


module.exports=leaderRouter;
