const { Flavor, Food } = require('./models');

async function seed() {
  try {


    const flavor1 = await Flavor.create({name: 'sour'})
    const flavor2 = await Flavor.create({name: 'sweet'})
    const flavor3 = await Flavor.create({name: 'umami'})
    const flavor4 = await Flavor.create({name: 'bitter'})
    const flavor5 = await Flavor.create({name: 'salty'})


    const food1 = await Food.create({
      name: 'pizza'
    })

    const food2 = await Food.create({
      name: 'sushi'
    })

    const food3 = await Food.create({
      name: 'taco'
    })

    await food1.setFlavors([flavor2, flavor3, flavor5])
    
    process.exit();
  } catch (e) {
    console.log(e)
  }
}

seed();