const express = require('express');
const pitStopRouter = express.Router();
const pitStopController = require('../Controllers/pitStopController');

// Define routes
pitStopRouter.post('/createPitStop', pitStopController.createPitStop);
pitStopRouter.post('/filtered', pitStopController.getPitStopByFilter);
pitStopRouter.patch('/:id', pitStopController.editPitStopDetails);

module.exports = pitStopRouter;