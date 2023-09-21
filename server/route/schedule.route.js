const express = require("express")
const scheduleRouter = express.Router()
const { scheduleModel } = require("../model/schedule.model")


scheduleRouter.get('/schedule', async (req, res) => {
    try {
      console.log(req.query)
      const { startDate, endDate } = req.query;
      const scheduleData = await scheduleModel.find({
        startDate: { $gte: startDate },
        endDate: { $lte: endDate },
      });
      console.log(scheduleData)
      res.json(scheduleData);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  scheduleRouter.post('/schedule', async (req, res) => {
    try {
      const {activityName, startDate, endDate, completed } = req.body;

      const scheduleData = new scheduleModel({activityName, startDate, endDate, completed})
      await scheduleData.save()
      res.json({"msg":"activity added!"});
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  module.exports = { scheduleRouter }