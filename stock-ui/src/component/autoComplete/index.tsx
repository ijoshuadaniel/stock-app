import { useContext, useEffect, useState } from "react";
import InputText from "../../elements/inputText";
import "./index.scss";

import { IoMdClose } from "react-icons/io";
import { ShimmerText } from "shimmer-effects-react";
import { AppContext } from "../../context/AppContext";
import { ThemeContext } from "../../context/themeContext";
import request from "../../utils/axios";
import { pages } from "../../utils/constants";

interface stockData {
  symbol: string;
  symbolInfo: string;
  symbolSuggest: object[];
  resultType: string;
  resultSubType: string;
  activeSeries: string[];
  listing_date: Date;
  url: string;
}

const AutoComplete = () => {
  const { theme } = useContext(ThemeContext);
  const { toggleSearch, setPageInfo, changePage } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search !== "") {
      getData(search);
    }
  }, [search]);

  const getData = async (key: string) => {
    if (search !== "") {
      setLoading(true);
      try {
        const response = await request.get(`/nse/autocomplete?stock=${key}`);
        setAutocompleteData(response.data.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const onChange = async (value: string) => {
    setSearch(value);
  };

  const handleStockInfo = (value: string) => {
    toggleSearch();
    setPageInfo({
      stock: value,
      headers: {
        name: value,
        showBackBtn: true,
        pageToGo: pages.stock,
      },
    });
    changePage(pages.stockInfo);
  };

  return (
    <div className="autocomplete">
      <div className="autocomplete-head">
        <p>Search</p>
        <IoMdClose onClick={toggleSearch} />
      </div>
      <div className="autocomplete-searchbox">
        <InputText
          type="text"
          placeholder="Search for Stocks"
          value={search}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {loading && (
        <div className="autocomplete-stocks">
          {Array(4)
            .fill(null)
            .map(() => {
              return (
                <div className="autocomplete-stocks_wrapper">
                  <ShimmerText mode={theme} line={1} width={30} />
                  <ShimmerText mode={theme} line={1} width={30} />
                </div>
              );
            })}
        </div>
      )}

      {autocompleteData.length > 0 && (
        <div className="autocomplete-stocks">
          {autocompleteData.map((data: stockData) => {
            return (
              <div
                className="autocomplete-stocks_wrapper"
                onClick={() => handleStockInfo(data.symbol)}
              >
                <h3>{data.symbol}</h3>
                <p>{data.symbolInfo}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
