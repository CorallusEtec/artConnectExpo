import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

export interface MockData {
  id: number;
  titulo: string;
  dataPublicacao: string;
}
export interface PublicacaoContextType {
  data: MockData;
  setData: Dispatch<SetStateAction<MockData>>;
}

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
  dadosPubli: MockData;
}) {
  const [data, setData] = useState<MockData>(dadosPubli);

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
