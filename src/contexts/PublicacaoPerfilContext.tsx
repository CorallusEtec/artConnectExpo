import {
    PublicacaoResponse
} from "@/models/response/PublicacaoResponse";
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
export interface PublicacaoPerfilContextType {
  data: PublicacaoResponse;
  setData: Dispatch<SetStateAction<PublicacaoResponse>>;
}

// CONTEXTO CRIADO
const PublicacaoContext = createContext<PublicacaoPerfilContextType>(
  {} as PublicacaoPerfilContextType,
);

/**
 *
 * @param param0 Componentes filhos que consumirão o contexto.
 * @returns Provider que injeta os dados da publicação para os demais componentes via contexto.
 */
export function PublicacaoPerfilProvider({
  children,
  dadosPubli,
}: {
  children: ReactNode;
  dadosPubli: PublicacaoResponse;
}) {
  const [data, setData] = useState<PublicacaoResponse>(dadosPubli);

  return (
    <PublicacaoContext.Provider value={{ data: data, setData: setData }}>
      {children}
    </PublicacaoContext.Provider>
  );
}

/**
 *
 * @returns Dados da publicação para árvore de componentes de Publicação.
 */
export function usePublicacaoPerfilData(): PublicacaoPerfilContextType {
  const context = useContext(PublicacaoContext);

  return context;
}
