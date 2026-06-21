import { UsuarioResponse } from "@/models/response/UsuarioResponse";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

type PerfilContextType = {
  modalConfig: boolean;
  setModalConfig: Dispatch<SetStateAction<boolean>>;
  dataPerfil?: UsuarioResponse;
};

const PerfilContext = createContext<PerfilContextType>({
  modalConfig: false,
} as PerfilContextType);

type PerfilProviderProps = {
  children: ReactNode;
  dataInicial?: UsuarioResponse;
};

export function PerfilProvider({ children, dataInicial }: PerfilProviderProps) {
  const [modalConfig, setModalConfig] = useState(false);
  const [dataPerfil, setDataPerfil] = useState<UsuarioResponse | undefined>(dataInicial);

  useEffect(() => {
    setDataPerfil(dataInicial);
  }, [dataInicial]);

  return (
    <PerfilContext.Provider
      value={{ modalConfig, setModalConfig, dataPerfil }}
    >
      {children}
    </PerfilContext.Provider>
  );
}

export function usePerfil() {
  const context = useContext(PerfilContext);
  if (context == undefined) {
    throw new Error("O contexto deve ser usado em um provider do perfil");
  }
  return context;
}
