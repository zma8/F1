const express = require('express');
const router = express.Router();

const Race = require('../../models/race.js');
const User = require('../../models/user.js');
const Predictions = require('../../models/predictions.js');

const requireAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/');
  }
  next();
};


router.get('/', requireAdmin, async (req, res) => {
  try {
    const allRaces = await Race.find({}).sort({ date: 1 });
    res.render('admin/races/index.ejs', {
      races: allRaces
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', requireAdmin, async (req, res) => {
  res.render('admin/races/new.ejs');
});


router.get('/:raceId', requireAdmin, async (req, res) => {
  try {
    const race = await Race.findById(req.params.raceId);
    res.render('admin/races/show.ejs', {
      race: race
    });
  } catch (error) {
    console.log(error);
    res.redirect('/admin/races');
  }
});

router.get('/:raceId/edit', requireAdmin, async (req, res) => {
  try {
    const race = await Race.findById(req.params.raceId);
    res.render('admin/races/edit.ejs', {
      race: race
    });
  } catch (error) {
    console.log(error);
    res.redirect('/admin/races');
  }
});

router.post('/', requireAdmin, async (req, res) => {
  try {
    await Race.create(req.body);
    res.redirect('/admin/races');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/races/new');
  }
});



router.delete('/:raceId', requireAdmin, async (req, res) => {
  try {
    await Race.findByIdAndDelete(req.params.raceId);
    res.redirect('/admin/races');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/races');
  }
});

router.put('/:raceId', requireAdmin, async (req, res) => {
  try {
    const oldRace = await Race.findById(req.params.raceId);
    

    if (req.body.podium && typeof req.body.podium === 'string') {
      req.body.podium = req.body.podium.split(',').map(name => name.trim());
    }

    await Race.findByIdAndUpdate(req.params.raceId, req.body);
    

    if (req.body.status === 'completed' && oldRace.status !== 'completed') {
      const updatedRace = await Race.findById(req.params.raceId);
      const predictions = await Predictions.find({ raceId: req.params.raceId });
      
      for (let prediction of predictions) {
        let points = 0;
        
        if (prediction.pole === updatedRace.pole) points += 10;
        if (prediction.winner === updatedRace.winner) points += 15;
        if (prediction.fastestLap === updatedRace.fastestLap) points += 5;
        if (prediction.firstDNF === updatedRace.firstDNF) points += 5;
        

        if (updatedRace.podium && updatedRace.podium.length >= 3 && 
            prediction.podium && prediction.podium.length >= 3) {
          for (let i = 0; i < 3; i++) {
            if (prediction.podium[i] === updatedRace.podium[i]) {
              points += 5;
            }
          }
        }
        
        await Predictions.findByIdAndUpdate(prediction._id, { points: points });
      }
    }
    
    res.redirect('/admin/races');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/races');
  }
});
module.exports = router;