function allowRoles(role) {
  return (req, res, next) => {
    if (role.includes(req.user.role)) {
      next();
    } else {
      res.json({ user: "Not Allowed" });
    }
  };
}
module.exports = allowRoles;
