import { TipoConta } from "@/models/enumeration/enumeration";
import { AuthLoginResponse } from "@/models/response/AuthLoginResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";

type AuthContextType = {
  token: AuthLoginResponse | null;
  isLoading: boolean;
  isAuth: boolean;
  signIn: (token: AuthLoginResponse) => Promise<void>;
  signOut: () => Promise<void>;
  getValidateToken: () => string;
  getTipoConta: () => TipoConta;
  getValidateId: () => number;
};

const AuthContext = createContext<AuthContextType | null>({
  isAuth: false,
  isLoading: true,
  token: null,
  signIn: async (token: AuthLoginResponse) => {},
  signOut: async () => {},
  getValidateToken: () => "",
  getTipoConta: () => "CONVIDADO",
  getValidateId: () => 0,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<AuthLoginResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const queryClient = useQueryClient();

  // Busca o token salvo ao abrir o aplicativo
  useEffect(() => {
    async function loadToken() {
      try {
        const savedToken = await AsyncStorage.getItem("@artconnect:token");
        if (savedToken) setToken(JSON.parse(savedToken));
        if (savedToken != null) {
          setIsAuth(true);
        } else {
          setIsAuth(false);  
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadToken();
  }, []);

  async function signIn(login: AuthLoginResponse) {
    await AsyncStorage.setItem("@artconnect:token", JSON.stringify(login));
    setToken(login); // Muda o estado global
    setIsAuth(true);
    queryClient.invalidateQueries();
    router.dismissTo("/home");
  }

  async function signOut() {
    await AsyncStorage.removeItem("@artconnect:token");
    setToken(null); // Remove o acesso instantaneamente
    setIsAuth(false);
    queryClient.invalidateQueries();
    router.dismissTo("/login");
  }

  function getValidateToken(): string {
    if (token) {
      return token.token;
    } else {
      return "";
    }
  }

  function getValidateId(): number {
    if (token) {
      return token.id;
    } else {
      return 0;
    }
  }

  function getTipoConta(): TipoConta {
    return token ? token.tipoConta : "CONVIDADO";
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoading,
        isAuth,
        signIn,
        signOut,
        getValidateToken,
        getValidateId,
        getTipoConta,
      }}
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
