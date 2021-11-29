function auth(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      next();
    } else {
      return res.status(404).send({message: 'user unauthenticated'});
    }
  } catch (e) {
    return res.status(500).send({message: `Something wrong -> ${e}`});
  }
}

module.exports = {
  auth
}