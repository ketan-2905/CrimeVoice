import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { userId, role }
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authenticate;
