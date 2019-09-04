const { Router } = require('express');
const { User } = require('../models');
const { hashPassword, genToken, checkPassword } = require('../services/auth');

const usersRouter = Router();

// This function makes the response back to the front end when a user logins in or registers
// We include the json web token as well as the username and user ID
// WE DO NOT WANT TO INCLUDE THE PASSWORD OR HASH/DIGEST!
// The less info on the front about the users password, the better
const buildAuthResponse = (user) => {
  const tokenData = {
    id: user.id,
    username: user.username,
  };

  const token = genToken(tokenData);
  const userData = {
    username: user.username,
    id: user.id,
  };

  return {
    user: userData,
    token,
  };
};

// Here we define the user register
// We immediately hash the password and never use the original password again
// Then we add the new user and return our pre-defined response
usersRouter.post('/register', async (req, res) => {
  try {
    const pwd = await hashPassword(req.body.password);

    const user = await User.create({
      username: req.body.username,
      password_digest: pwd,
    });

    const respData = buildAuthResponse(user);

    res.json({ ...respData });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});


// For user login, We first find the user in our database
// Then we check the hashed form of the password from the login attempt against the password hash in our database
// If there are no errors, we return our pre-define response to the front end
usersRouter.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (await checkPassword(req.body.password, user.password_digest)) {
      const respData = buildAuthResponse(user);

      res.json({ ...respData });
    } else {
      res.status(401).send('Invalid Credentials');
    }
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
});

module.exports = usersRouter;
