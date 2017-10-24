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
        name: 'A tasty Rioja',
        region: 'London',
        pairings: 'bacon',
        tastingNotes: 'really quite special... i need more of this now please',
        buyLink: 'www.google.com',
        images: 'https://i.pinimg.com/originals/1c/52/25/1c522569bc380d65fc08fc8824fdcbd5.png',
        caption: 'vape reviews!'
      },{
        name: 'A weird shiraz',
        region: 'manchester',
        pairings: 'marmite',
        tastingNotes: 'I wouldn\'t recommend this - really not tasty at all.',
        buyLink: 'www.google.com',
        images: 'https://www.strictlywine.co.uk/1817-thickbox_default/barossa-shiraz-reserve-berton.jpg'  }]);
  })
  .then((wines) => console.log(`${wines.length} new and tasty wines created`))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
