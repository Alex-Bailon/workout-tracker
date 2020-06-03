const mongoose = require('mongoose')

const Schema = mongoose.Schema

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
    name: {
        type: String,
        require: [true, "A name is required"]
    },
    type: {
        type: String,
        require: [true, "A tyoe is required"]
    },
    weight: {
        type: Number
    },
    sets: {
        type: Number
    },
    reps: {
        type: Number
    },
    duration: {
        type: Number
    },
    distance: {
        type: Number
    }
    }]
})

const Workout = mongoose.model('Workout', WorkoutSchema)

module.exports = Workout
