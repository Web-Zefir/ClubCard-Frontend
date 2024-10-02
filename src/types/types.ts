import { ReactNode } from "react";

export interface User {
    birthday: string;
    phoneNumber: string | null;
    secondName: ReactNode;
    lastName: ReactNode;
    firstName: ReactNode;
    id: string;
    name: string;
    email: string;
    privilege: 'standard' | 'premium' | 'vip';
  }
  
export interface CardRequest {
    user: User | null;
    id: string;
    type: string;
    status: 'pending' | 'ready' | 'blocked' | 'approved' | 'rejected';
}