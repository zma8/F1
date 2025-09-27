// controllers/admin/races.js
const express = require('express');
const router = express.Router();

const Race = require('../../models/race.js');
const User = require('../../models/user.js');


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


router.put('/:raceId', requireAdmin, async (req, res) => {
  try {
    await Race.findByIdAndUpdate(req.params.raceId, req.body);
    res.redirect('/admin/races');
  } catch (error) {
    console.log(error);
    res.redirect('/admin/races');
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

module.exports = router;