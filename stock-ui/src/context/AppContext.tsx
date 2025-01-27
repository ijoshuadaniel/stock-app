import { createContext, ReactNode, useState } from "react";
import { pages } from "../utils/constants";

interface AppContextType {
  showSearch: boolean;
  page: string;
  pageInfo: {
    stock?: string;
    headers: {
      name: string;
      showBackBtn: boolean;
      pageToGo: string;
    };
  };
  toggleSearch: () => void;
  changePage: (page: string) => void;
  setPageInfo: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<AppContextType>({
  showSearch: false,
  page: pages.stock,
  pageInfo: {
    stock: "",
    headers: {
      name: "Stocks",
      showBackBtn: false,
      pageToGo: pages.stock,
    },
  },
  toggleSearch: () => {},
  changePage: () => {},
  setPageInfo: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [page, setPage] = useState(pages.stock);
  const [pageInfo, setPageInfo] = useState({
    stock: "",
    headers: {
      name: "Stocks",
      showBackBtn: false,
      pageToGo: pages.stock,
    },
  });

  const toggleSearch = () => {
    setShowSearch((prevState) => !prevState);
  };

  const changePage = (page: string) => {
    setPage(page);
  };

  return (
    <AppContext.Provider
      value={{
        showSearch,
        toggleSearch,
        page,
        changePage,
        pageInfo,
        setPageInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
