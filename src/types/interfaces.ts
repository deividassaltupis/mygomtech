import { Roles } from './enums';

// * All reusable interfaces stored here

export interface IItem {
  id: string;
  name: string;
  role: Roles;
  email: string;
  createdAt: string;
  emailUpdatedAt: string;
}

export interface IUser {
  updateUser: () => void;
  deleteData: () => void;
  errorMessage: string;
  isLoading: boolean;
  username: string;
  email: string;
  id: string;
}
