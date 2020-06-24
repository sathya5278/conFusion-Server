const express=require('express');

const bodyParser=require('body-parser');

const promoRouter=express.Router();

const Promotions = require('../models/promotions');

var authenticate = require('../authenticate');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(authenticate.verifyOrdinaryUser,(req,res,next) =>{
   Promotions.find({})
   .then((promotions)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(promotions);
   },(err)=>
      next(err)
   )
   .catch((err)=>next(err));
})
.post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Promotions.create((req.body))
   .then((promotion)=>{
      console.log('Promotion created ', promotion);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(promotion);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /promotions');
})
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Promotions.remove({}) 
   .then((resp)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(resp);
   },(err)=>next(err))
   .catch((err)=>next(err));
});


promoRouter.route('/:promoId')
.get(authenticate.verifyOrdinaryUser,(req,res,next) =>{
   Promotions.findById(req.params.promoId)
   .then((promotion)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(promotion);
   },(err)=>next(err))
   .catch((err)=>next(err));
})
.post(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   res.statusCode=403;
    res.end('POST operation is not supported for /promotion/' + req.params.promoId);
})
.put(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
    Promotions.findByIdAndUpdate(req.params.promoId)
    .then((promotion)=>{
       res.statusCode = 200;
       res.setHeader('Content-Type','application/json');
       res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(authenticate.verifyOrdinaryUser,authenticate.verifyAdmin,(req,res,next) => {
   Promotions.findByIdAndDelete(req.params.promoId)
   .then((promotion)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(promotion);
   },(err)=>next(err))
   .catch((err)=>next(err));
});

module.exports=promoRouter;
