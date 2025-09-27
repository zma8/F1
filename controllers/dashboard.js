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
        const recentPredictions=await Predictions.find({
            userId:req.session.user._id
        }).populate('raceId').sort({createdAt:-1}).limit(5);
         
        let completedCount=0;
        let totalPoints=0;

        for(let prediction of recentPredictions){
            if(prediction.raceId&&prediction.raceId.status==='completed'){
                completedCount++;
                totalPoints+=prediction.points ||0;
            }
        }

        const averageAccuracy=completedCount>0?
        Math.round((totalPoints/(completedCount*50))*100):0;

        res.render('dashboard/index.ejs',{
            user:user,
            nextRace:nextRace,
            userPrediction:userPrediction,
            countdown:countdown,
            recentPredictions:recentPredictions,
            status:{
                totalPoints:totalPoints,
                averageAccuracy:averageAccuracy,
                totalPredictions:completedCount
            }
        });
    }catch (err){
      console.log(error);
      res.redirect('/'); 
    }
});

module.exports=router;