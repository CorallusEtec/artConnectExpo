import { SearchFiltroParams } from "@/models/request/pageable/SearchFiltroParams";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

type SearchContextType = {
  modalFiltro: boolean;
  setModalFiltro: (value: boolean) => void;
  tipoFiltro: RefObject<"Publicacao" | "Usuario">;
  form: SearchFiltroParams; 
  setForm: React.Dispatch<React.SetStateAction<SearchFiltroParams>>; 
  aplicarFiltros: () => void;
  filtrosAtivos: SearchFiltroParams;
  resetCounter: number;
  limparFiltros: () => void;
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

type SearchProviderProps = {
  children: ReactNode;
  initialState: boolean;
};

const valoresIniciais: SearchFiltroParams = {
  nome: "",
  legenda: "",
  arte: "",
  generoArte: "",
  cidade: "",
  uf: "",
};

export function SearchProvider({ children, initialState }: SearchProviderProps) {
  const [modalFiltro, setModalFiltro] = useState(initialState);
  const [resetCounter, setResetCounter] = useState(0);

  const [form, setForm] = useState<SearchFiltroParams>({ ...valoresIniciais });
  const [filtrosAtivos, setFiltrosAtivos] = useState<SearchFiltroParams>({ ...valoresIniciais });
  const tipoFiltro = useRef<"Publicacao" | "Usuario">("Usuario");

  function aplicarFiltros() {
    setFiltrosAtivos({ ...form });
  }

  function limparFiltros() {
    setForm({ ...valoresIniciais });
    setFiltrosAtivos({ ...valoresIniciais });
    setResetCounter(prev => prev + 1);
  }

  return (
    <SearchContext.Provider 
      value={{ 
        tipoFiltro, 
        modalFiltro, 
        setModalFiltro, 
        form, 
        setForm, 
        aplicarFiltros, 
        filtrosAtivos, 
        limparFiltros, 
        resetCounter 
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}