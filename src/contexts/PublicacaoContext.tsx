import { PublicacaoResponse } from "@/models/response/Publicacao/PublicacaoResponse";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useReducer,
  useState
} from "react";

/** Tipagem do contexto
 */
type PublicacaoContextType = {
  data: PublicacaoResponse;
  dispatch: Dispatch<PublicacaoReducerActions>;
  comentarioSection: boolean; // Modal da seção de comentários
  setComentarioSection: Dispatch<SetStateAction<boolean>>;
};

// CONTEXTO CRIADO
const PublicacaoContext = createContext<PublicacaoContextType>(
  {} as PublicacaoContextType,
);

/** Função reducer e ações */
type PublicacaoReducerActions = { type: "LIKE" } | { type: "DISLIKE" };

function reducer(
  data: PublicacaoResponse,
  action: PublicacaoReducerActions,
): PublicacaoResponse {
  switch (action.type) {
    case "LIKE":
      if (data.reacaoUsuario == "LIKE") {
        return { ...data, likes: data.likes - 1, reacaoUsuario: null };
      } else if (data.reacaoUsuario == "DISLIKE") {
        return {
          ...data,
          dislikes: data.dislikes - 1,
          likes: data.likes + 1,
          reacaoUsuario: "LIKE",
        };
      } else {
        return { ...data, likes: data.likes + 1, reacaoUsuario: "LIKE" };
      }
    case "DISLIKE":
      if (data.reacaoUsuario == "DISLIKE") {
        return { ...data, dislikes: data.dislikes - 1, reacaoUsuario: null };
      } else if (data.reacaoUsuario == "LIKE") {
        return {
          ...data,
          dislikes: data.dislikes + 1,
          likes: data.likes - 1,
          reacaoUsuario: "DISLIKE",
        };
      } else {
        return {
          ...data,
          dislikes: data.dislikes + 1,
          reacaoUsuario: "DISLIKE",
        };
      }
    default:
      throw new Error("Ação não suportada");
  }
}

type PublicacaoProviderProps = {
  children: ReactNode;
  dataInicial: PublicacaoResponse;
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
  const [comentarioSection, setComentarioSection] = useState(false); // Modal de comentários
  const [data, dispatch] = useReducer(reducer, dataInicial);

  return (
    <PublicacaoContext.Provider
      value={{ data, dispatch, setComentarioSection, comentarioSection }}
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
