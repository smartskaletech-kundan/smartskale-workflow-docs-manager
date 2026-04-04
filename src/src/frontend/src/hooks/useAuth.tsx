import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type UserRole = "admin" | "member";

export interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
}

const CREDENTIALS: Record<
  string,
  { password: string; role: UserRole; name: string }
> = {
  "admin@smartskale.tech": {
    password: "SmartSkale@26",
    role: "admin",
    name: "Admin",
  },
  "ashray@smartskale.tech": {
    password: "Ashray@26",
    role: "member",
    name: "Ashray",
  },
  "rahul@smartskale.tech": {
    password: "Rahul@26",
    role: "member",
    name: "Rahul",
  },
  "Kundan@smartskale.tech": {
    password: "Kundan@26",
    role: "member",
    name: "Kundan",
  },
  "muzeeb@smartskale.tech": {
    password: "Muzeeb@26",
    role: "member",
    name: "Muzeeb",
  },
  "abhilasha@smartskale.tech": {
    password: "SmartSkale@26",
    role: "member",
    name: "Abhilasha",
  },
  "suraj@smartskale.tech": {
    password: "Suraj@26",
    role: "member",
    name: "Suraj",
  },
};

const STORAGE_KEY = "smartskale_auth_user";

function loadStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

interface AuthContextType {
  user: AuthUser | null;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(loadStoredUser);

  const login = useCallback(
    (email: string, password: string): { success: boolean; error?: string } => {
      const cred = CREDENTIALS[email];
      if (!cred) return { success: false, error: "Invalid email or password" };
      if (cred.password !== password)
        return { success: false, error: "Invalid email or password" };
      const authUser: AuthUser = { email, role: cred.role, name: cred.name };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setUser(authUser);
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, isLoggedIn: !!user }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
