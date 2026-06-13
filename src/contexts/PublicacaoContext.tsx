import { PublicacaoDetails } from "@/models/response/PublicacaoResponse";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

/**
 * Tipagem do contexto
 */
type PublicacaoContextType = {
  data: PublicacaoDetails;
  setData: Dispatch<SetStateAction<PublicacaoDetails>>;
};

// CONTEXTO CRIADO
const PublicacaoContext = createContext<PublicacaoContextType>(
  {} as PublicacaoContextType,
);

type PublicacaoProviderProps = {
  children: ReactNode;
  dataInicial: PublicacaoDetails;
};

/**
 *
 * @param param0 Componentes filhos que consumirão o contexto.
 * @returns Provider que injeta os dados da publicação para os demais componentes via contexto.
 */
export function PublicacaoProvider({
  children,
  dataInicial,
}: PublicacaoProviderProps) {
  const [data, setData] = useState<PublicacaoDetails>(dataInicial);

  return (
    <PublicacaoContext.Provider value={{ data, setData }}>
      {children}
    </PublicacaoContext.Provider>
  );
}

/**
 *
 * @returns Dados da publicação para árvore de componentes de Publicação.
 */
export function usePublicacao(): PublicacaoContextType {
  const context = useContext(PublicacaoContext);

  return context;
}
