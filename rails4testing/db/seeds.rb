# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' },, { name: 'Lord of the Rings' },])
#   Character.create(name: 'Luke', movie: movies.first)

sour = Flavor.create!(name: 'sour')
sweet = Flavor.create!(name: 'sweet')
umami = Flavor.create!(name: 'umami')
bitter = Flavor.create!(name: 'bitter')
salty = Flavor.create!(name: 'salty')

Food.create!(name: 'pizza', flavors: [sweet, umami, salty])
Food.create!(name: 'taco', flavors: [sweet, umami, salty, sour])
Food.create!(name: 'sushi', flavors: [umami, salty])
