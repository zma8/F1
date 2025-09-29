const express =require('express');
const router=express.router();

const User=require('../models/user.js');
const Race = require('../models/race.js');
const Predicitions=require('../models/predictions.js');

router.get('/', async(req,res)=>{
    try{
        const userPredictions=await Predicitions.find({
            userId:req.session.user._id
        }).populate('raceId');

        const completedPrediciotns=userPredictions.filter(p=>p.raceId&&p.raceId.status=='completed');
        const totalPoints=completedPrediciotns.reduce((sum,p)=>sum+(p.points||0),0);
        const averagePoints=completedPrediciotns.length>0?totalPoints/completedPrediciotns.length:0;
        const accuracy=completedPrediciotns.lastIndexOf>0?Math.round((totalPoints/(completedPrediciotns.length*50))*100):0;

       
    }catch(error){
    console.log(error);
    res.redirect('/dashboard');
    }
})