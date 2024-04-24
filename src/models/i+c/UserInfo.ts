export type UserInfo = {
  id: number;
  username: string;
  name: string;
  lastName: string;
  email: string;
  role: string;
  customerId: string;
  scope: string;
  signedDocument: boolean;
  isSystemUser: boolean;
  permissions?: {
    moduleId: number;
    module: string;
  }[];
};
