export interface UserModel {
  _id: string;
  name: string;
  email: string;
  isActive: boolean;
  isVerified: boolean;
  roleName: string;
  registeredAt: string;
  verifiedAt: string;
}
