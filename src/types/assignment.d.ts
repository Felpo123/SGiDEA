import { User } from "next-auth";

export interface Assignment {
    initial_date: date;
    end_date: date;
    description: string;
    users: User;
    objects: Object;
  }