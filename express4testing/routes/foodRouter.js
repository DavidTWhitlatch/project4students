const express = require('express');
const { Food, Flavor } = require('../models');
const { restrict } = require('../services/auth');

const foodRouter = express.Router();

// Using the '.route' syntax, we can define multiple request methods for the same endpoint
// We just chain '.' followed by the request method that we want to define 

foodRouter.route('/')
  // Getting all food and returning an array
  // Notice how we used the '.get()' method.
  // This is a sequelize thing and cane be used instead of '.dataValues'
  .get(async (req, res, next) => {
    try {
      const foods = await Food.findAll();
      res.json(foods.map(food => food.get()));
    } catch (e) {
      next(e);
    }
  })
  // Creating a new food item using the body of the request. returning the newly created item.
  .post(restrict, async (req, res, next) => {
    try {
      const newFood = await Food.create(req.body);
      res.json(newFood.get());
    } catch (e) {
      next(e);
    }
  });

// Defining a new route. this will be for everything that takes a food id in the params
foodRouter.route('/:id')
  // Getting a single food item.
  // We also wanted to nest the flavors in the food object that belong to that food item.
  // The many to many association lets us use the '.getFlavors()' method. notice that is plural 'Flavors'
  .get(async (req, res, next) => {
    try {
      const foodItem = await Food.findByPk(req.params.id);
      const flavors = await foodItem.getFlavors();
      res.json({ ...foodItem.get(), flavors });
    } catch (e) {
      next(e);
    }
  })
  // Updating a food item and returning the newly updated item
  .put(restrict, async (req, res, next) => {
    try {
      const foodItem = await Food.findByPk(req.params.id);
      foodItem.update(req.body);
      res.json(foodItem);
    } catch (e) {
      next(e);
    }
  })
  // Deleting a food item. Don't forget to send a response.
  // I like to include the ID of the item deleted
  .delete(restrict, async (req, res, next) => {
    try {
      const foodItem = await Food.findByPk(req.params.id);
      foodItem.destroy();
      res.status(200).send(`Deleted food with id ${req.params.id}`);
    } catch (e) {
      next(e);
    }
  });


// This is where we add to the many to many table.
// The url path includes an id for the flavor and food that we are associating
// We first find the food and all of its flavors
// Then find the flavor
// We then us the '.setFlavors()' method (again, pluralized).
// '.setFlavors()' takes an array of flavors
// We spread the old flavors with the newly added flavors
// The setFlavors method returns data from the join table which is not what we want to return from this middleware function for this app
// in the res.json, we rebuild the single food item and include the flavors 
foodRouter.route('/:food_id/flavors/:id')
  .put(restrict, async (req, res, next) => {
    try {
      const food = await Food.findByPk(req.params.food_id);
      const prevFlavors = await food.getFlavors();
      const newFlavor = await Flavor.findByPk(req.params.id);
      await food.setFlavors([...prevFlavors, newFlavor]);
      res.json({ ...food.get(), flavors: [...prevFlavors, newFlavor] });
    } catch (e) {
      next(e);
    }
  });


module.exports = foodRouter;
