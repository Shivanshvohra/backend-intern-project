const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token format." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; 
    // decoded contains: { id, role }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};