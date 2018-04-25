const { promisify } = require('util');
const fs = require('fs-extra');
const path = require('path');
const readFileAsync = promisify(fs.readFile);
const wineTags = ['newWorld', 'oldWorld', "red", 'dessert', 'rose', 'sparkling', 'white', 'meat', 'cheese', 'fruit', 'seafood', 'candy']

exports.seed = function (knex, Promise) {
  return knex('wine_meta').del()
    .then(()=>knex('metadata').del())
    .then(()=>knex('wines').del())
    .then(()=>readFileAsync(path.join(__dirname, '..', 'wineTable.json')))
    .then(data => JSON.parse(data))
    .then((wines) => knex('wines').insert(wines))
    .then((status) => knex.raw(`ALTER SEQUENCE wines_wine_id_seq RESTART WITH 1596`))
    .then(() => knex('metadata').insert(wineTags.map((tag, i) => ({ metadata_id: i, tag: tag }))))
    .then(() => knex('wines').select('wine_id', 'country', 'wine_style', 'food_suggestion'))
    .then(data => data.reduce((cumulator, wine, index) => {
      switch (wine.country) {
        case 'France':
        case 'Italy':
        case 'Spain':
        case 'Germany':
        case 'Portuagal':
        case 'Ausria':
        case 'Bulgaria': {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 1 });
          break;
        }
        default: {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 0 });
          break;
        }
      }

      switch (wine.wine_style) {
        case "Red - Savory and Classic":
        case "Red - Light and Perfumed":
        case "Red - Rich and Intense":
        case "Red - Savory and Classic": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 2 });
          break;
        }
        case "White - Aromatic and Floral":
        case "White - Buttery and Complex":
        case "White - Green and Flinty":
        case "White - Tropical and Balanced": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 6 });
          break;
        }
        case "Sparkling - Berries and Cream":
        case "Sparkling - Complex and Traditional":
        case "Sparkling - Fresh and Youthful":
        case "Sparkling - Sweet and Spritzy": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 5 });
          break;
        }
        case "Rose - Crisp and Dry":
        case "Rose - Rich and Fruity": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 4 });
          break;
        }
        case "Dessert - Caramelized and Sticky":
        case "Dessert - Lush and Balanced":
        case "Dessert - Rich and Warming": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 3 });
          break;
        }
        default: {
          break;
        }
      }

      switch (wine.food_suggestion) {
        case "Fruit-based Desserts": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 9 });
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 11 });
        }
        case "Beef and Venison":
        case "Chicken and Turkey":
        case "Duck, Goose and Game Birds":
        case "Lamb":
        case "pork": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 7 });
          break;
        }
        case "Blue Cheeses":
        case "Brie and Camembert":
        case "Cheddar and Gruyere":
        case "Goats' Cheese and Feta":
        case "Manchego and Parmesan": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 8 });
          break;
        }
        case "Cakes and Cream":
        case "Chocolate and Caramel": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 11 });
          break;
        }
        case "Chilis and Hot Spicy Foods":
        case "Mushrooms":
        case "Root Vegetables and Squashes":
        case "Tomato-based Dishes": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 9 });
          break;
        }
        case "Meaty and Oily Fish":
        case "Shellfish, Crab and Lobster":
        case "White Fish": {
          cumulator.push({ wine_id: wine.wine_id, metadata_id: 10 });
          break;
        }
        default: {
        }
      }
      return cumulator;
    }, []))
    .then(data => {
      return knex.batchInsert('wine_meta', data, 500);
    });
};
