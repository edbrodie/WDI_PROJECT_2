const Wine = require('../models/wine');

function indexRoute(req, res, next) {
  Wine
    .find()
    .populate('createdBy')
    .exec()
    .then((wines) => res.render('wines/index', { wines }))
    .catch(next);
}

function newRoute(req, res) {
  return res.render('wines/new');
}

function createRoute(req, res, next) {
  req.body.createdBy = req.user;

  Wine
    .create(req.body)
    .then(() => res.redirect('/wines'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/wines/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function showRoute(req, res, next) {
  Wine
    .findById(req.params.id)
    .populate('createdBy comments.createdBy')
    .exec()
    .then(wine => {
      if(!wine) return res.notFound();
      return res.render('wines/show', { wine });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  Wine
    .findById(req.params.id)
    .exec()
    .then(wine => {
      if(!wine) return res.redirect();
      if(!wine.belongsTo(req.user)) return res.unauthorized('No one gave you the rights to edit this content');
      return res.render('wines/edit', { wine });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  Wine
    .findById(req.params.id)
    .exec()
    .then(wine => {
      if(!wine) return res.notFound();
      if(!wine.belongsTo(req.user)) return res.unauthorized('No one gave you the rights to edit this content');

      for(const field in req.body) {
        wine[field] = req.body[field];
      }

      return wine.save();
    })
    .then(() => res.redirect(`/wines/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/wines/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  Wine
    .findById(req.params.id)
    .exec()
    .then(wine => {
      if(!wine) return res.notFound();
      if(!wine.belongsTo(req.user)) return res.unauthorized('Unauthorized!');
      return wine.remove();
    })
    .then(() => res.redirect('/wines'))
    .catch(next);
}

function createCommentRoute(req, res, next) {
  console.log('comment test');
  Wine
    .findById(req.params.id)
    .exec()
    .then(wine => {
      if (!wine) return res.notFound();

      req.body.createdBy = req.user;
      wine.comments.push(req.body);

      return wine.save();
    })
    .then(() => res.redirect(`/wines/${req.params.id}`))
    .catch((err) => {
      if (err.name === 'ValidationError') res.badRequest(`/wines/${req.params.id}`, err.toString());
      next(err);
    });
}

function deleteCommentRoute(req, res, next) {
  Wine
    .findById(req.params.id)
    .exec()
    .then(wine => {
      if (!wine) return res.notFound();
      if (!wine.belongsTo(req.user)) return res.unauthorized('You do not have permission to delete that resource');
      wine.comments.id(req.params.commentId).remove();

      return wine.save();
    })
    .then(wine => res.redirect(`/wines/${wine.id}`))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute
};
