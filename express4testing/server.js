const bodyParser = require('body-parser');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');


const flavorsRouter = require('./routes/flavorRouter');
const usersRouter = require('./routes/usersRouter');
const foodRouter = require('./routes/foodRouter');
const homeRouter = require('./routes/homeRouter');

const PORT = 3001;
const app = express();


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());


app.use('/auth', usersRouter);
app.use('/food', foodRouter);
app.use('/flavors', flavorsRouter);
app.use('/', homeRouter);


// Here we are defining a default error message. notice the 4 parameters in the middleware function
// whenever we call '.next()' and pass it an argument (ex. '.next(e)'), the argument is an error
// Express will immediately jump this middleware function to handle the error
app.use((e, req, res, next) => {
  if (e) {
    console.log(e);
    res.status(500).send(e.message)
  }
})

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});