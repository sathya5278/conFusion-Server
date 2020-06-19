const express=require('express');

const bodyParser=require('body-parser');

const leaderRouter=express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
   res.end('Will send all the leaders to you!'); 
})
.post((req,res,next) => {
   res.end('Will add the leader ' + req.body.name + ' with the details ' + req.body.description); 
})
.put((req,res,next) => {
    res.statusCode=403;
    res.end('PUT operation not supported on /leaders');
})
.delete((req,res,next) => {
   res.end('All the leaders will be deleted'); 
});


leaderRouter.route('/:leaderId')
.all((req,res,next) =>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) =>{
   res.end('Will send the details of leader '+ req.params.leaderId + ' to you'); 
})
.post((req,res,next) => {
   res.statusCode=403;
    res.end('POST operation is not supported for /leader/' + req.params.leaderId);
})
.put((req,res,next) => {
    res.write('Updating the leader ' + req.params.leaderId + '\n');
    res.end('Will update the leader '+ req.body.name + ' with deatils ' + req.body.description);
})
.delete((req,res,next) => {
   res.end('Deleting the leader ' + req.params.leaderId); 
});


module.exports=leaderRouter;
