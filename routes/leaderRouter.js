const express=require('express');

const bodyParser=require('body-parser');

const Leaders = require('../models/leaders');

var authenticate = require('../authenticate');

const cors = require('./cors');

const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) =>{
   Leaders.find({})
   .then((leaders)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leaders);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Leaders.create(req.body)
   .then((leader)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leader)
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /leaders');
})
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Leaders.remove({})
   .then((leaders)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leaders)
   },(err)=>next(err))
   .catch((err)=>next(err));
});


leaderRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) =>{
   Leaders.findById(req.params.leaderId)
   .then((leader)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   res.statusCode=403;
    res.end('POST operation is not supported for /leader/' + req.params.leaderId);
})
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Leaders.findByIdAndUpdate(req.params.leaderId)
    .then((leader)=>{
       res.statusCode=200;
       res.setHeader('Content-Type','application/json');
       res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Leaders.findByIdAndDelete(req.params.leaderId)
   .then((leader)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(leader);
   },(err)=>next(err))
   .catch((err)=>next(err));
});


module.exports=leaderRouter;
