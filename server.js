const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
  })
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
  })
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
          $addFields: { totalDuration: { $sum: '$exercises.duration'},},
        },
    ])
        .then((dbworkout) => {
            res.json(dbworkout)
        })
        .catch((e) => {
            res.json(e)
        })
});
  app.post("/api/workouts", (req, res) => {
    db.Workout.create({})
        .then((dbworkout) => {
          console.log(dbworkout)
            res.json(dbworkout)
        })
        .catch((err) => {
            res.json(err)
        })
});

app.put("/api/workouts/:id", (req, res) => {
  console.log(req.body)
  // const fakeData = {
  //   type: 'resistance',
  //   name: 'Bicep Curl',
  //   duration: 20,
  //   weight: 100,
  //   reps: 10,
  //   sets: 4,
  // }
    db.Workout.findByIdAndUpdate(
        { _id: req.params.id},
        { $push: { exercises: req.body} },
        { new: true}
    )
        .then((dbworkout) => {
            res.json(dbworkout)
        })
        .catch((e) => {
            res.json(e)
        })
});
app.get(`/api/workouts/range`, (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: '$exercises.duration' },
                totalWeight: { $sum: '$exercises.weight' }
            }
        }
    ])
        .then((dbworkout) => {
            res.json(dbworkout)
        })
        .catch((e) => {
            res.json(e)
        })
});
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });