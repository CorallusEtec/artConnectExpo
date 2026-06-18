import { createContext, ReactNode, useContext, useRef } from "react";

/** Contexto para listagem */
type ComentarioContextType = {
  comentarioId: number;
};
const ComentarioContext = createContext<ComentarioContextType>(
  {} as ComentarioContextType,
);

type ComentarioProviderProps = {
  children: ReactNode;
  comentarioIdInitial: number;
};

export function ComentarioProvider({
  children,
  comentarioIdInitial,
}: ComentarioProviderProps) {
  const comentarioId = useRef(comentarioIdInitial);

  return (
    <ComentarioContext.Provider value={{ comentarioId: comentarioId.current }}>
      {children}
    </ComentarioContext.Provider>
  );
}

export function useComentario() {
  const comentarioContext = useContext(ComentarioContext);

  return comentarioContext;
}
