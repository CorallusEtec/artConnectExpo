import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";

type SearchContextType = {
  modalFiltro: boolean;
  setModalFiltro: Dispatch<SetStateAction<boolean>>;
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

type SearchProviderProps = {
  children: ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const [modalFiltro, setModalFiltro] = useState(false);

  return (
    <SearchContext.Provider value={{ modalFiltro, setModalFiltro }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (context == undefined) {
    throw new Error("Usar o contexto em um Search provider");
  }
  return context;
}
