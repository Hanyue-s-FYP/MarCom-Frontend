export type User = {
  Username: string;
  Password: string;
  Email: string;
  Status: number; // for now just 1 for all first
  PhoneNumber: string;
};

export type GetUser = Omit<User, "Password"> & { Role: string; RoleID: number };
