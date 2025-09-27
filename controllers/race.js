const express = require('express');
const router = express.Router();

const Race = require('../models/race.js');
const Predictions = require('../models/predictions.js');

router.get('/', async (req, res) => {
  try {
    const allRaces = await Race.find({}).sort({ date: 1 });
    res.render('races/index.ejs', {
      races: allRaces
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:id',async(req,res)=>{
    try{
        const race = await Race.findById(req.params.id);

        let userPrediction=null;
        if(req.session.user){
            userPrediction= await Predictions.findOne({
                userId: req.session.user._id,
                raceId:req.params.id
            });
        }
        res.render ('races/show.ejs',{
            race:race,
            userPrediction:userPrediction
        });
    } catch(error){
     console.log(error);
    res.redirect('/');
    }
});

router.get('/:raceId/predictions',async(req,res)=>{
    try{
        const race=await Race.findById(req.params.raceId);
        const predictions= await Predictions.find({raceId:req.params.raceId}).populate('userId');

        res.render('races/predictions.ejs',{
            race:race,
            predictions:predictions
        });
    } catch(error){
     console.log(error);
    res.redirect('/');
    }
});

router.get('/:raceId/predictions/new', async(req,res)=>{
    try{
        const race=await Race.findById(req.params.raceId);

        const existingPrediction=await Predictions.findOne({
            userId:req.session.user._id,
            raceId:req.params.raceId
        });

        if(existingPrediction){
            return res.redirect(`/predictions/${existingPrediction._id}/edit`);
        }

        res.render('predictions/new.ejs',{
            race:race
        });

    } catch(error){
     console.log(error);
    res.redirect('/');
    }

});

router.post('/:raceId/predictions',async(req,res)=>{
    try{
        req.body.userId=req.session.user._id;
        req.body.raceId=req.params.raceId;

        await Predictions.create(req.body);
        res.redirect('/dashboard');
    } catch(error){
     console.log(error);
    res.redirect('/');
    }
});
module.exports=router;