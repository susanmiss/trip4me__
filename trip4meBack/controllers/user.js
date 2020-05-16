exports.hasAuthorization = (req, res, next) => {
  let adminUser = req.auth && req.auth.role === "admin";
  const authorized = adminUser

  if(!authorized) {
    return res.status(403).json({
      error: 'User is not authorized to perform this action'
    });
  }
  next();
};
