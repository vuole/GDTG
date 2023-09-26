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
  createdAt?: string;
  updatedAt?: string;
}
