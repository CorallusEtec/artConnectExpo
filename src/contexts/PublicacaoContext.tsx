import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

/** Tipagem do contexto
 */
type PublicacaoContextType = {
  idPublicacao: number;
  comentarioSection: boolean; // Modal da seção de comentários
  setComentarioSection: Dispatch<SetStateAction<boolean>>;
};

// CONTEXTO CRIADO
const PublicacaoContext = createContext<PublicacaoContextType>(
  {} as PublicacaoContextType,
);

type PublicacaoProviderProps = {
  children: ReactNode;
  idPublicacaoInit: number;
};

/**
 *
 * @param param0 Componentes filhos que consumirão o contexto.
 * @returns Provider que injeta os dados da publicação para os demais componentes via contexto.
 */
export function PublicacaoProvider({
  children,
  idPublicacaoInit,
}: PublicacaoProviderProps) {
  const [comentarioSection, setComentarioSection] = useState(false); // Modal de comentários
  const idPublicacao = useRef(idPublicacaoInit);

  return (
    <PublicacaoContext.Provider
      value={{
        idPublicacao: idPublicacao.current,
        setComentarioSection,
        comentarioSection,
      }}
    >
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
  if (context == undefined) {
    throw new Error(
      "O contexto deve ser usado dentro do provider de Publicação",
    );
  }

  return context;
}
