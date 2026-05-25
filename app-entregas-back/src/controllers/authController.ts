import { Request, Response } from 'express';
import { findUserByEmail } from '../store/memoryStore';

// Mock a JWT or session token
const generateSessionToken = (userId: string): string => {
  // In a real app, this would be a JWT or session ID from a store.
  // For this mock, we'll use a simple string.
  return `mock-session-token-for-${userId}`;
};

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }

  // Remove password from the returned user object for security
  const { password: _, ...userWithoutPassword } = user;
  const sessionToken = generateSessionToken(user.id);

  res.status(200).json({
    user: userWithoutPassword,
    token: sessionToken,
  });
};
