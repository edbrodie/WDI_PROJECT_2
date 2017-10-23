const User = require('../models/user');


function sessionNew(req, res) {
  res.render('session/new');
}

function sessionCreate(req, res) {

  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('session/new', { message: 'Unrecognised credentials' });
      }
      req.flash('success', `${user.username}, you've logged in!`);
      req.session.userId = user._id;
      req.session.isAuthenticated = true;

      res.redirect('/');
    });
}

function sessionDelete(req,res) {
  return req.session.regenerate(() => {
    req.flash('success', 'You successfully logged out.');
    res.redirect('/');
  });
}
module.exports = {
  new: sessionNew,
  create: sessionCreate,
  delete: sessionDelete
};
