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
  isLoading: boolean;
  isAuth: boolean;
  signIn: (token: AuthLoginResponse) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>({
  isAuth: true,
  isLoading: true,
  token: null,
  signIn: async (token: AuthLoginResponse) => {},
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<AuthLoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuth = useRef(true);

  // Busca o token salvo ao abrir o aplicativo
  useEffect(() => {
    async function loadToken() {
      try {
        const savedToken = await AsyncStorage.getItem("@artconnect:token");
        if (savedToken) setToken(JSON.parse(savedToken));
        if (savedToken != null) {
          isAuth.current = true;
        }
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
    await AsyncStorage.removeItem("@artconnect:token");
    setToken(null); // Remove o acesso instantaneamente
  };
  return (
    <AuthContext.Provider
      value={{ token, isLoading, isAuth: isAuth.current, signIn, signOut }}
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
