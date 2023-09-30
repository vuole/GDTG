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
  jwt?: string;
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
  conversations?: Array<Message>;
  createdAt?: string;
  updatedAt?: string;
}

export enum ContractState {
  Drafting = "drafting",
  WaitA = "waita",
  WaitB = "waitb",
  Confirmed = "confirmed",
}

export enum MessageType {
  MessageA = "messagea",
  MessageB = "messageb",
}

export interface Message {
  _id?: string;
  senderID?: string;
  senderName?: string;
  message?: string;
  messageType?: MessageType;
  createdAt?: string;
}

export interface Conversations {
  conversations: Array<Message>;
}
