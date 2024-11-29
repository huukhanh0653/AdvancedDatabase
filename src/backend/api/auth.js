function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

function isEmployee(req, res, next) {
  if (req.isAuthenticated() && req.user.Username.startsWith("employee")) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

module.exports = { isAuthenticated, isEmployee };
