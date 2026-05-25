export interface User {
  id: string;
  name: string;
  email: string;
  role: 'deliveryman' | 'admin'; // Assuming specific roles for a delivery app
}

export interface AuthResponse {
  user: User;
  token: string;
}
