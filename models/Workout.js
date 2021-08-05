const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: "Please eneter the type of exercise"
            },
            name: {
                type: String,
                required: "Please eneter the name of the exercise"
            },
            duration: {
                type: Number,
                required: "Please eneter the duration of exercise"
            },
            distance: {
                type: Number,
                default: 0, 
            },
            weight: {
                type: Number,
                default: 0
            },
            reps: {
                type: Number,
                default: 0
            },
            sets: {
                type: Number,
                default: 0
            }
        }
    ]
})








const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
