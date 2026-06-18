import { ArquivoType } from "@/models/request/ArquivoType";
import { AuthRegisterRequest } from "@/models/request/AuthRegisterRequest";
import { createContext, ReactNode, RefObject, useContext, useRef } from "react";

type CadastroContextType = {
  cadastroRequest: RefObject<AuthRegisterRequest>;
  fotoPerfil: RefObject<ArquivoType | undefined>;
};

const CadastroContext = createContext<CadastroContextType>(
  {} as CadastroContextType,
);

type CadastroProviderProps = {
  children: ReactNode;
};

export function CadastroProvider({ children }: CadastroProviderProps) {
  const cadastroRequest = useRef({} as AuthRegisterRequest);
  const fotoPerfil = useRef<ArquivoType>(undefined);
  return (
    <CadastroContext.Provider value={{ cadastroRequest, fotoPerfil }}>
      {children}
    </CadastroContext.Provider>
  );
}

export function useCadastro() {
  const context = useContext(CadastroContext);

  if (context == undefined)
    throw new Error("Usar esse contexto apenas em um CadastroProvider");

  return context;
}
