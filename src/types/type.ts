export interface User {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  isAdmin?: boolean;
  address?: string;
  companyName?: string;
  position?: string;
}

export interface Transaction {
  _id?: string;
  name?: string;
  amount?: string;
  transactionState?: string;
  contractState?: ContractState;
  adminA?: User;
  adminB?: User;
  membersA?: Array<User>;
  membersB?: Array<User>;
  contract?: string;
  createdAt?: string;
  updatedAt?: string;
}

export enum ContractState {
  Drafting = "drafting",
  WaitA = "waita",
  WaitB = "waitb",
  Confirmed = "confirmed",
}
