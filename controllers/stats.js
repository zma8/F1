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

        let bestRace = null;
        let highestPoints = 0;

        for (let prediction of completedPredictions) {
          const points = prediction.points || 0;
          if (points > highestPoints) {
             highestPoints = points;
             bestRace = prediction;
          }
        }

        let categoryStats={
            pole:{correct:0,total:0},
            winner:{correct:0,total:0},
            podium:{correct:0,total:0},
            fastestLap:{correct:0,total:0},
            firstDNF:{correct:0,total:0},
        };

        completedPrediciotns.forEach(prediction=>{
            if(prediction.raceId&&prediction.raceId.status=='completed'){
                categoryStats.pole.total++;
                if(prediction.pole===prediction.raceId.pole){
                    categoryStats.pole.correct++;
                }

                categoryStats.winner.total++;
                if(prediction.winner===prediction.raceId.winner){
                    categoryStats.winner.correct++;
                }

                categoryStats.fastestLap.total++;
                if(prediction.fastestLap===prediction.raceId.fastestLap){
                    categoryStats.fastestLap.correct++;
                }
                 categoryStats.firstDNF.total++;
                if (prediction.firstDNF === prediction.raceId.firstDNF) {
                   categoryStats.firstDNF.correct++;
                }

                if(prediction.podium&&prediction.raceId.podium){
                    categoryStats.podium.total+=3;
                    prediction.podium.forEach(driver=>{
                        if(prediction.raceId.podium.includes(driver)){
                            categoryStats.podium.correct++;
                        }
                    });
                }
            }
        });

        for(let category in categoryStats){
            const stat=categoryStats[category];

            if(stat.total>0){
                stat.prediction=Math.round((stat.correct/stat.total)*100);
            } else {
                stat.prediction=0;
            }
        }

        res.render('stats/index.ejs',{
            userPredictions: userPredictions,
            completedPredictions: completedPredictions,
            categoryStats: categoryStats,
            bestRace: bestRace,
            stats: {
              totalPredictions: userPredictions.length,
              completedPredictions: completedPredictions.length,
              upcomingPredictions: userPredictions.length - completedPredictions.length,
              totalPoints: totalPoints,
              averagePoints: Math.round(averagePoints * 100) / 100,
              accuracy: accuracy
            }
        });

    }catch(error){
    console.log(error);
    res.redirect('/dashboard');
    }
});
