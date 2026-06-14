import { ComentarioResponse } from "@/models/response/ComentarioResponse";
import { createContext, ReactNode, useContext, useState } from "react";

/** Contexto para listagem */
type ComentarioContextType = {
  data: ComentarioResponse;
  setData: (data: ComentarioResponse) => void;
};
const ComentarioContext = createContext<ComentarioContextType>(
  {} as ComentarioContextType,
);

type ComentarioProviderProps = {
  children: ReactNode;
  initialData: ComentarioResponse;
};

export function ComentarioProvider({
  children,
  initialData,
}: ComentarioProviderProps) {
  const [data, setData] = useState(initialData);

  return (
    <ComentarioContext.Provider value={{ data, setData }}>
      {children}
    </ComentarioContext.Provider>
  );
}

export function useComentarioList() {
  const comentarioContext = useContext(ComentarioContext);

  return comentarioContext;
}
