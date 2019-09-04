const Sequelize = require('sequelize');
const { Model } = require('sequelize');

const sequelize = new Sequelize({
  database: 'testing4testing',
  dialect: 'postgres',
  operatorsAliases: false,
  define: {
    underscored: true,
    returning: true,
  },
});

class Food extends Model {}
Food.init({
  name: Sequelize.STRING,
}, { sequelize, modelName: 'food' });

class Flavor extends Model {}
Flavor.init({
  name: Sequelize.STRING,
}, { sequelize, modelName: 'flavor' });

// Here we define our many to many associations
// This creates a new table called 'food_flavors' as a join table

Food.belongsToMany(Flavor, { through: 'food_flavors' });
Flavor.belongsToMany(Food, { through: 'food_flavors' });

// Also setting up a 'user' table for auth with 'pasword_digest'. NOT 'password'!

class User extends Model {}
User.init({
  username: Sequelize.STRING,
  password_digest: Sequelize.STRING,
}, { sequelize, modelName: 'user' });

module.exports = {
  Food,
  Flavor,
  sequelize,
  User,
};
