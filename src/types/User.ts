export type UserAccountInfo = {
  Username: string;
  Password: string;
};

export type UserDetail = {
  Email: string;
  Status: number; // for now just 1 for all first
  PhoneNumber: string;
};

export type User = UserAccountInfo & UserDetail;

export type GetUser = {
  User: Omit<User, "Password"> & { ID: number };
  Role: string;
  RoleID: number;
};
