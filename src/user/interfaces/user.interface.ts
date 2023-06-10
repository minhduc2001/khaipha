export interface IUserGetByUniqueKey {
  username?: string;
  email?: string;
  phone?: string;
}

export interface ICreateUser {
  phone: string;
  password: string;
  username: string;
}
