const express = require('express');
const { Flavor } = require('../models')
const flavorRouter = express.Router();

// Same .route syntax from the food router
// Just returning show all for this table
flavorRouter.route('/')
  .get(async (req, res, next) => {
    try{
      const flavors = await Flavor.findAll();
      res.json(flavors.map(flavor => flavor.dataValues))
    } catch(e) {
      next(e)
    }
  })


module.exports = flavorRouter;