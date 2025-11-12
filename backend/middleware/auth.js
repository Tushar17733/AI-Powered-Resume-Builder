import jwt from 'jsonwebtoken';

export default function(req, res, next) {
  // Get token from header
  let token = req.header('x-auth-token') || req.header('Authorization');
  
  // Check if token is in Authorization header format (Bearer token)
  if (token && token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  }

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};