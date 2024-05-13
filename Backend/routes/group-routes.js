const express=require('express')

const { createGroup, getAllGroups }=require('../controllers/group-controller')

const groupRouter=express.Router();

groupRouter.post('/createGroup',createGroup)

groupRouter.get('/groups/:userId',getAllGroups)


module.exports=groupRouter
