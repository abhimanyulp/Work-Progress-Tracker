const mongoose = require("mongoose")

const scheduleSchema = mongoose.Schema({
    activityName: String,
    startDate: Date,
    endDate: Date,
    completed: Boolean
})

const scheduleModel = mongoose.model("schedule", scheduleSchema)

module.exports = { scheduleModel }