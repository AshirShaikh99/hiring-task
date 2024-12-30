import { UserEntity } from "../entities";

declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
    };
  }
}
