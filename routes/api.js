const express = require('express')
const router = require('express').Router()
const Workout = require("../models/Workout")
const path = require("path")

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})
router.get('/exercise', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
})
router.get('/stats', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
})

router.get("/api/workouts", (req,res) => {
  Workout.find({})
  .then(workouts => {
    res.send(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});
router.put("/api/workouts/:id", ({body,params},res) => {
  Workout.findByIdAndUpdate(params.id,
    {
      $push: {
        exercises: body
      }
    },
    (error, data) => {
      if (error) {
        res.send(error);
      } else {
        let totalDurationUpdate = data.totalDuration + body.duration
        Workout.findByIdAndUpdate(params.id,
          {
            totalDuration: totalDurationUpdate
          },
          (err, newData) => {
            if (err){
              res.send(err)
            } else {
              res.send(newData);
            }
          }
        )
      }
    }
  );
});
router.post("/api/workouts", ({body},res) => {
  Workout.create(body)
    .then(workout => {
      res.json(workout);
    })
    .catch(err=> {
      res.json(err);
  })
});
router.get("/api/workouts/range", (req,res) => {
  Workout.find({}).limit(7)
  .then(workouts => {
    res.json(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });
})

module.exports = router