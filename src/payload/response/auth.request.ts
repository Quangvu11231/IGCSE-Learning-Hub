export interface IUser {
  userID: string,
  userName: string,
  email: string,
  name: string,
  address: string,
  phone: string,
  dateOfBirth: Date,
  isActive: boolean,
  roles: string,
  token: string,
  refreshToken: string
}
