const express = require('express');
const router  = express.Router();
const registration = require('../controllers/registration');
const session = require('../controllers/session');
const winesController = require('../controllers/wines');

// A home route
router.get('/', (req, res) => res.render('homepage'));


router.route('/register')
  .get(registration.new)
  .post(registration.create);

router.route('/login')
  .get(session.new)
  .post(session.create);

router.route('/logout')
  .get(session.delete);


router.route('/wines')
  .get(winesController.index)
  .post(winesController.create);

router.route('/wines/new')
  .get(winesController.new);

router.route('/wines/:id')
  .get(winesController.show)
  .put(winesController.update)
  .delete(winesController.delete);

router.route('/wines/:id/edit')
  .get(winesController.edit);

router.route('/wines/:id/comments')
  .post(winesController.createComment)
  .delete(winesController.deleteComment);



router.all('*', (req, res) => res.notFound());

module.exports = router;
