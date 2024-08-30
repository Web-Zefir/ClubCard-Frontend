import { ReactNode } from "react";

export interface User {
    birthday: ReactNode;
    phoneNumber: ReactNode;
    secondName: ReactNode;
    lastName: ReactNode;
    firstName: ReactNode;
    id: string;
    name: string;
    email: string;
    privilege: 'standard' | 'premium' | 'vip';
  }
  
export interface CardRequest {
    id: string;
    type: string;
    status: 'pending' | 'ready' | 'blocked' | 'approved' | 'rejected';
}
  

  
  