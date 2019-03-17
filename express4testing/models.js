const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database: 'testing4testing',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true,
    returning: true
  }
});

const Food = sequelize.define('food', {
  name: Sequelize.STRING,
})

const Flavor = sequelize.define('flavor', {
  name: Sequelize.STRING,
})

// Here we define our many to many associations
// This creates a new table called 'food_flavors' as a join table

Food.belongsToMany(Flavor, { through: 'food_flavors' });
Flavor.belongsToMany(Food, { through: 'food_flavors' });

// Also setting up a 'user' table for auth with 'pasword_digest'. NOT 'password'!
const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password_digest: Sequelize.STRING
})

module.exports = {
  Food,
  Flavor,
  sequelize,
  User
};