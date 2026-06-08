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
export interface PublicacaoContextType {
  data: PublicacaoDetails;
  setData: Dispatch<SetStateAction<PublicacaoDetails>>;
}

// CONTEXTO CRIADO
const PublicacaoContext = createContext<PublicacaoContextType>(
  {} as PublicacaoContextType,
);

/**
 *
 * @param param0 Componentes filhos que consumirão o contexto.
 * @returns Provider que injeta os dados da publicação para os demais componentes via contexto.
 */
export function PublicacaoProvider({
  children,
  dadosPubli,
}: {
  children: ReactNode;
  dadosPubli: PublicacaoDetails;
}) {
  const [data, setData] = useState<PublicacaoDetails>(dadosPubli);

  const handlePublicacaoData = (value: any, att: string) => {
    switch (att) {
      default:
        setData((prevState) => ({
          ...prevState,
          publicacao: {
            ...prevState.publicacao,
            [att]: value,
          },
        }));
    }
  };
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
export function usePublicacaoData(): PublicacaoContextType {
  const context = useContext(PublicacaoContext);

  return context;
}
