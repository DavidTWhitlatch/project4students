const { sequelize } = require('./models');

const main = async () => {
  try{
    await sequelize.sync({ force: true });
    process.exit();
  } catch(e) {
    console.error(e);
  }
};

main();