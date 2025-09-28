const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Race = require('../models/race.js');
const Predictions = require('../models/predictions.js');

router.get('/', async (req,res)=>{
    try{
        const userPredictions=await Predictions.find({
            userId:req.session.user._id
        }).populate('raceId');

        res.render('predictions/index.ejs',{
            predictions:userPredictions
        });

    } catch (error){
    console.log(error);
    res.redirect('/dashboard');
    }

});

router.get('/:id', async(req,res)=>{
    try{
        const prediction = await Predictions.findById(req.params.id).populate('raceId');

        if(prediction.userId.toString()!= req.session.user._id){
            return res.redirect('/predictions');
        }
        res.render('predictions/show.ejs',{
            prediction:prediction
        });
    } catch (error){
    console.log(error);
    res.redirect('/predictions');
    }

});

router.get('/:id/edit', async (req, res) => {
  try {
    const prediction = await Predictions.findById(req.params.id).populate('raceId');

    if (prediction.userId.toString() != req.session.user._id) {
      return res.redirect('/predictions');
    }

    if (prediction.raceId.status != 'upcoming') {
      return res.redirect(`/predictions/${req.params.id}`);
    }

    res.render('predictions/edit.ejs', {
      prediction: prediction
    });
  } catch (error) {
    console.log(error);
    res.redirect('/predictions');
  }
});

router.put('/:id', async (req, res) => {
  try {
    const prediction = await Predictions.findById(req.params.id).populate('raceId');
    
    if (prediction.userId.toString() != req.session.user._id) {
      return res.redirect('/predictions');
    }

    if (prediction.raceId.status != 'upcoming') {
      return res.redirect(`/predictions/${req.params.id}`);
    }

    await Predictions.findByIdAndUpdate(req.params.id, req.body);

    res.redirect('/predictions');

  } catch (error) {
    console.log(error);
    res.redirect(`/predictions/${req.params.id}/edit`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const prediction = await Predictions.findById(req.params.id).populate('raceId');
    
    if (prediction.userId.toString() != req.session.user._id) {
      return res.redirect('/predictions');
    }

    if (prediction.raceId.status != 'upcoming') {
      return res.redirect(`/predictions/${req.params.id}`);
    }

    await Predictions.findByIdAndDelete(req.params.id);
    res.redirect('/predictions');
  } catch (error) {
    console.log(error);
    res.redirect('/predictions');
  }
});

module.exports=router;