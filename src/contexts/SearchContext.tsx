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
  form: RefObject<SearchFiltroParams>;
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

type SearchProviderProps = {
  children: ReactNode;
  initialState: boolean;
};

export function SearchProvider({
  children,
  initialState,
}: SearchProviderProps) {
  const [modalFiltro, setModalFiltro] = useState(initialState);
  const form = useRef({ nome: "", legenda: "" } as SearchFiltroParams);
  const tipoFiltro = useRef<"Publicacao" | "Usuario">("Usuario");
  return (
    <SearchContext.Provider
      value={{ tipoFiltro, modalFiltro, setModalFiltro, form }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  return context;
}
