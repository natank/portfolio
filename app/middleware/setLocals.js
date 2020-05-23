function setUserType(req, res) {
  if (req.user)
    res.locals.userType = req.user.admin ? 'admin' : 'user';
  else res.locals.userType = 'guest';
}
exports.adminData = function (req, res, next) {
  setUserType(req, res);
  res.locals.section = 'admin';
  next();
}