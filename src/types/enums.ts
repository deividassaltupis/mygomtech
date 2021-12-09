export enum Roles {
  read = 'read',
  write = 'write',
  admin = 'admin',
}

export enum Routes {
  Login = '/login',
  Users = '/items',
  WrongEmails = '/items/wrong',
  ReusedEmails = '/items/reused',
  OldEmails = '/items/old',
  Root = '/',
}

export enum API {
  Login = 'api/login',
  Verify = 'api/verify',
  Logout = 'api/logout',
  Items = 'api/items',
  User = 'api/user',
}

export enum ItemFilter {
  ALL = 'All',
  WRONG = 'Wrong',
  REUSED = 'Reused',
  OLD = 'Old',
}
