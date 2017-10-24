//require user database
const User = require('../models/user');


function registrationNew(req,res) {
  res.render('registration/new');
}


function registrationCreate(req,res) {
  User
    .create(req.body)
    .then((user) => {
      req.flash('info', `You're now regiesterd, ${user.username}! Please login, below.`);
      req.session.userId =user._id;
      res.redirect('/login');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).render('registration/new', { message: 'Your Passwords don\'t match!' });
      }
      res.status(500).end();
    });
}

//export them
module.exports = {
  new: registrationNew,
  create: registrationCreate
};
