import { createContext } from "react";
import { DefaultAuthConfig } from "../configs";

// DEFINE AUTH CONTEXT
export const AuthContext = createContext(DefaultAuthConfig);