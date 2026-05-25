import { Request, Response, NextFunction } from 'express';

const BEARER_TOKEN = process.env.BEARER_TOKEN;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (token == null) {
    return res.sendStatus(401); // If there's no token, return 401
  }

  if (token !== BEARER_TOKEN) {
    return res.sendStatus(401); // If the token is not valid, return 401
  }

  next(); // If token is valid, proceed to the next middleware/controller
};
