const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');

mongoose.connect(dbUri, { useMongoClient: true });


// Require the model
const User = require('../models/user');
const Wine = require('../models/wine');
// Drop the model
User.collection.drop();
Wine.collection.drop();
// Create the models
User
  .create([{
    username: 'EddyB',
    email: 'ed@ed.com',
    password: 'password',
    passwordConfirmation: 'password'
  } ,
  {
    username: 'bobbyb',
    email: 'bob@bob.com',
    password: 'password',
    passwordConfirmation: 'password'
  }])
  .then((users) => {
    console.log(`${users.length} new users created`);
    return Wine
      .create([{
        createdBy: users [0],
        name: 'Rioja Crianza 2013 Viña',
        region: 'Northern Spain',
        pairings: 'Rice dishes, Cheese, Pâté',
        tastingNotes: 'black fruit and liquorice notes, with hints of cocoa and toast',
        buyLink: 'https://www.majestic.co.uk/wines/rioja-crianza-14455',
        image: 'https://i.pinimg.com/736x/35/e0/67/35e0678fda8eddc0f06d70e0af848cb2--wine-photography-wine-night.jpg'
      },{
        createdBy: users [0],
        name: 'Kangarilla Road Shiraz 2016',
        region: 'Australia',
        pairings: 'Roast Beef',
        tastingNotes: 'Berry fruits and mixed spices',
        buyLink: 'https://www.majestic.co.uk/wines/kangarilla-road-shiraz-19504',
        image: 'http://photovino.com/wp-content/uploads/2016/07/DSC9446_500px.jpg'
      },{
        createdBy: users [1],
        name: 'Parrilla Malbec 2015 Viñalba',
        region: 'Argentina',
        pairings: 'Pair with juicy steaks or sausages straight off the grill.',
        tastingNotes: 'Damson, Blackberry and Plum flavours, accented with Oak Toast',
        buyLink: 'https://www.majestic.co.uk/wines/parrilla-malbec-40144',
        image: 'http://www.photopiaphotography.co.uk/img/photography/thumb/chase-cuvee-amphorae.jpg'
      }]);
  })
  .then((wines) => console.log(`${wines.length} new and tasty wines created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
