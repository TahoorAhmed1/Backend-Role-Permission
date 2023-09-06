const jwt = require("jsonwebtoken");
const fetchuser = async (req, res, next) => {
  try {
    const token = req.header("Auth-Token");
    if (!token) {
      return res.status(404).json({ token: "Invalid Token" });
    }
    let data = jwt.verify(token, "#1212213#21$$$13");
    req.user = data.user;
    next();
  } catch (err) {
    res.status(405).json({ message: err.message });
  }
};

module.exports = fetchuser;
