const express = require('express');
const favoriteRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');
const bodyParser = require('body-parser');
const Favorites = require('../models/favorites');
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=200;})
.get(cors.cors,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    Favorites.findOne({'user':req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorites)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorites);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    Favorites.findOne({'user':req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorite)=>{
        if(favorite!=null){
            for(var i in req.body){
                for (var j = 0; j < (favorite.dishes.length); j++) {
                    if(req.body[i]._id == favorite.dishes[j]._id)
                        break;
                    if(j == favorite.dishes.length-1){
                        favorite.dishes.push(req.body[i]._id);
                        favorite.save()
                        .then((favorite)=>{
                            res.statusCode = 200;
                            res.setHeader('Content-Type','application/json');
                            res.json(favorite);
                        },(err)=>next(err))
                    }
                }
            } 
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(favorite);
        }
        else{
            Favorites.create({'user':req.user._id})
            .then((favorite)=>{
                for(var j in req.body){
                    favorite.dishes.push(req.body[j]._id);
                    favorite.save()
                    .then((favorite)=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json(favorite);
                    },(err)=>next(err))
                }
            },(err)=>next(err))
        }
    })
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    Favorites.remove({'user':req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorites)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(favorites);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions,(req,res)=>{res.sendStatus=200;})
.get(cors.cors,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('GET operation not supported on /favorites/:dishId');
})
.post(cors.corsWithOptions,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    Favorites.findOne({'user':req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorite)=>{
        if(favorite!=null){
                for (var j = 0; j < (favorite.dishes.length); j++) {
                    if(req.params.dishId == favorite.dishes[j]._id)
                        break;
                    if(j == favorite.dishes.length-1){
                        favorite.dishes.push(req.params.dishId);
                        favorite.save()
                        .then((favorite)=>{
                            res.statusCode = 200;
                            res.setHeader('Content-Type','application/json');
                            res.json(favorite);
                            return;
                        },(err)=>next(err))
                    }
                }  
                res.statusCode = 403;
                res.end('Dish already present in favourites');
        }
        else{
            Favorites.create({'user':req.user._id})
            .then((favorite)=>{
                    favorite.dishes.push(req.params.dishId);
                    favorite.save()
                    .then((favorite)=>{
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.json(favorite);
                    },(err)=>next(err))
            },(err)=>next(err))
        }
    })
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites/:dishId');
})
.delete(cors.corsWithOptions,authenticate.verifyOrdinaryUser,(req,res,next)=>{
    Favorites.findOne({'user':req.user._id})
    .populate('user')
    .populate('dishes')
    .then((favorite)=>{
        for(var i = 0;i < favorite.dishes.length;i++){
            if(req.params.dishId == favorite.dishes[i]._id){
                favorite.dishes.pop();
                favorite.save()
                .then((favorite)=>{
                    res.statusCode = 200;
                    res.setHeader('Content-Type','application/json');
                    res.json(favorite);
                },(err)=>next(err))  
            }
        } 
    },(err)=>next(err))
    .catch((err)=>next(err));
})
module.exports = favoriteRouter;