export type Role = 'ADMIN' | 'AGENT' | 'BUYER' | 'NRI';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
