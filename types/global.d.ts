import type { User } from "../models/User";


declare global {
    namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string;
    }
}
    namespace Express {
      interface Request {
        user?: User;
      }
    }
  }

  export {}