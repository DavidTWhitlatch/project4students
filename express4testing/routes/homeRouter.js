const express = require('express');

const homeRouter = express.Router();

homeRouter.get('/', (req, res) => res.send('You guys are amazing!'));


module.exports = homeRouter;