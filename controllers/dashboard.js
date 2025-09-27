const express=require('express');
const router=express.Router();

const User=require('../models/user');
const Race=require('../models/race');
const Predictions=require('../models/predictions');

router.get('/',async (req,res)=>{
    try{
        const user=await User.findById(req.session.user._id);

        const nextRace=await Race.findOne({
            status:'upcoming',
            date:{$gte:new Date()}
        }).sort ({date:1});

        let userPrediction=null;
        if(nextRace){
            userPrediction=await Predictions.findOne({
                userId:req.session.user._id,
                raceId:nextRace._id
            });
        }

        let countdown=null;
        if(nextRace){
            const now=new Date();
            const raceDate=new Date(nextRace.date);
            const timeDiff=raceDate-now;

            if(timeDiff>0){
                const days=Math.floor(timeDiff/(1000*60*60*24));
                const hours=Math.floor((timeDiff%(1000*60*60*24))/(1000*60*60));
                countdown=`${days} days, ${hours} hrs`;
            }
        }

        

    }catch (err){
      console.log(error);
      res.redirect('/'); 
    }
})