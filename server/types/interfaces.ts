export interface IEmployee {
  id: string;
  name: string;
  role: string;
  email: string;
  createdAt: string;
  emailUpdatedAt: string;
}

export interface IToken {
  token: string;
  userId: string;
}
