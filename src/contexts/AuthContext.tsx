import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type AuthContextType = {
  token: AuthLoginResponse | null;
  isAuth: boolean;
  isLoading: boolean;
  signIn: (token: AuthLoginResponse) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<AuthLoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useRef(false);

  // Busca o token salvo ao abrir o aplicativo
  useEffect(() => {
    async function loadToken() {
      try {
        const savedToken = await AsyncStorage.getItem("@artconnect:token");
        if (savedToken) setToken(JSON.parse(savedToken));
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  const signIn = async (login: AuthLoginResponse) => {
    await AsyncStorage.setItem("@artconnect:token", JSON.stringify(login));
    setToken(login); // Muda o estado global
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@auth_token");
    setToken(null); // Remove o acesso instantaneamente
  };
  return (
    <AuthContext.Provider
      value={{ token, isLoading, signIn, signOut, isAuth: isAuth.current }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
}
