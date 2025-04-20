export type User = {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt: string;
  isOnline?: boolean;
  lastLogin?: string;
};
