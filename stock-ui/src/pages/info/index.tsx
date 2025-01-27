import { useContext, useEffect, useState } from "react";
import {
  ShimmerDiv,
  ShimmerTable,
  ShimmerText,
  ShimmerTitle,
} from "shimmer-effects-react";
import StockLineChart from "../../component/lineChart";
import { AppContext } from "../../context/AppContext";
import { ThemeContext } from "../../context/themeContext";
import request from "../../utils/axios";
import { rupees } from "../../utils/constants";
import "./index.scss";

interface StockData {
  symbol: string;
  equityInfo: {
    companyName: string;
  };
  quoteInfo: {
    priceInfo: {
      lastPrice: number;
      basePrice: number;
      open: number;
      close: number;
      pChange: number;
      previousClose: number;
      upperCP: number;
      lowerCP: number;
    };
    industryInfo: {
      basicIndustry: string;
    };
    securityInfo: {
      boardStatus: string;
      classOfShare: string;
      issuedSize: string;
      tradingStatus: string;
    };
  };
  chartData: {
    grapthData: [number, number][];
  };
  corpInfoData: {
    financial_results: {
      data: Record<string, any>[];
    };
    corporate_actions: {
      data: { exdate: string; purpose: string }[];
    };
    borad_meeting: {
      data: { meetingdate: string; purpose: string }[];
    };
    latest_announcements: {
      data: { broadcastdate: string; subject: string }[];
    };
  };
}

interface FinancialData {
  key: string;
  value: string;
}

const StockInfo = (): JSX.Element => {
  const { theme } = useContext(ThemeContext);
  const { pageInfo } = useContext(AppContext);
  const [data, setData] = useState<StockData | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async (): Promise<void> => {
    try {
      const response = await request.get(`/nse/stockinfo/${pageInfo.stock}`);
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    } finally {
      setLoading(false);
    }
  };

  const requiredData: FinancialData[] = [
    { key: "from_date", value: "From Date" },
    { key: "to_date", value: "To Date" },
    { key: "expenditure", value: "Expenditure" },
    { key: "income", value: "Income" },
    { key: "reDilEPS", value: "Rep.EPS" },
    { key: "reProLossBefTax", value: "Rep.P&L/BT" },
    { key: "proLossAftTax", value: "Rep.P&L/AT" },
    { key: "audited", value: "Audited" },
    { key: "consolidated", value: "Consolidated" },
    { key: "cumulative", value: "Cumulative" },
  ];

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="info">
        <div className="info-head">
          <ShimmerDiv mode={theme} height={100} width={100} />
          <br />
          <ShimmerTitle mode={theme} line={1} />
          <ShimmerText mode={theme} line={1} />
        </div>

        <div className="info-chart">
          <ShimmerDiv mode={theme} height={200} width={"100%"} />
        </div>

        <div className="info-container">
          <ShimmerTable mode={theme} row={3} col={2} borderColor="none" />
        </div>

        <div className="info-section">
          <ShimmerTable mode={theme} row={3} col={2} borderColor="none" />
        </div>

        <div className="info-section">
          <ShimmerTable mode={theme} row={3} col={2} borderColor="none" />
          <br />
        </div>

        <div className="info-section">
          <ShimmerTitle mode={theme} line={1} />
          <ShimmerText mode={theme} line={1} />
          <br />
        </div>

        <div className="info-section">
          <ShimmerTitle mode={theme} line={1} />
          <ShimmerText mode={theme} line={1} />
          <br />
        </div>
      </div>
    );
  }

  if (data) {
    const lastData =
      data.chartData.grapthData[data.chartData.grapthData.length - 1];
    const stockData = data.chartData.grapthData
      .filter((f) => f[1] !== 0)
      .filter((f) => f[1] !== lastData[1])
      .slice(-500);

    stockData.push(lastData);

    const labels = stockData.map((graph) => String(graph[0]));
    const prices = stockData
      .map((graph) => String(graph[1]))
      .filter((f) => f !== "0");

    return (
      <div className="info">
        <div className="info-head">
          <img
            src={`https://s3tv-symbol.dhan.co/symbols/${data.symbol}.svg`}
            alt="stock image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.add("show");
            }}
          />
          <div className="info-image-placeholder">{data.symbol.charAt(0)}</div>
          <h3>{data.equityInfo.companyName}</h3>
          <p>
            {rupees}
            {data.quoteInfo.priceInfo.lastPrice ?? "Unknown"}
          </p>
        </div>
        <div className="info-chart">
          <StockLineChart labels={labels} stockData={prices} />
        </div>
        <div className="info-container">
          <table className="info-section-table">
            <tbody>
              <tr>
                <td>Current Price</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.lastPrice ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Base Price</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.basePrice ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Open</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.open ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Close</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.close ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Price Change</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.pChange.toFixed(2) ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Previous Close</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.previousClose ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Upper Price</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.upperCP ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Lower Price</td>
                <td>
                  {rupees}
                  {data.quoteInfo.priceInfo.lowerCP ?? "Unknown"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="info-section">
          <h3>About</h3>
          <table className="info-section-table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  {data.equityInfo.companyName} ({data.symbol})
                </td>
              </tr>
              <tr>
                <td>Industry</td>
                <td>
                  {data.quoteInfo.industryInfo.basicIndustry ?? "Unknown"}
                </td>
              </tr>
              <tr>
                <td>Board</td>
                <td>{data.quoteInfo.securityInfo.boardStatus ?? "Unknown"}</td>
              </tr>
              <tr>
                <td>Share Type</td>
                <td>{data.quoteInfo.securityInfo.classOfShare ?? "Unknown"}</td>
              </tr>
              <tr>
                <td>Issue Size</td>
                <td>{data.quoteInfo.securityInfo.issuedSize ?? "Unknown"}</td>
              </tr>
              <tr>
                <td>Trading Status</td>
                <td>
                  {data.quoteInfo.securityInfo.tradingStatus ?? "Unknown"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {data.corpInfoData.financial_results.data.length > 0 && (
          <div className="info-section">
            <h3>Financial Results</h3>
            {data.corpInfoData.financial_results.data.map((corp, i) => (
              <div className="info-section-container" key={i}>
                <table className="info-section-table">
                  <tbody>
                    {requiredData.map((rq, j) => (
                      <tr key={j}>
                        <td>{rq.value}</td>
                        <td>{corp[rq.key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
        {data.corpInfoData.corporate_actions.data.length > 0 && (
          <div className="info-section">
            <h3>Corporate Actions</h3>
            {data.corpInfoData.corporate_actions.data.map((corp, i) => (
              <div className="info-section_wrapper" key={i}>
                <span>Date:</span>
                <p>{corp.exdate}</p>
                <span>Purpose:</span>
                <p>{corp.purpose}</p>
              </div>
            ))}
          </div>
        )}
        {data.corpInfoData.borad_meeting.data.length > 0 && (
          <div className="info-section">
            <h3>Board Meetings</h3>
            {data.corpInfoData.borad_meeting.data.map((corp, i) => (
              <div className="info-section_wrapper" key={i}>
                <span>Meeting Date:</span>
                <p>{corp.meetingdate}</p>
                <span>Purpose:</span>
                <p>{corp.purpose}</p>
              </div>
            ))}
          </div>
        )}
        {data.corpInfoData.latest_announcements.data.length > 0 && (
          <div className="info-section">
            <h3>Latest Announcements</h3>
            {data.corpInfoData.latest_announcements.data.map((corp, i) => (
              <div className="info-section_wrapper" key={i}>
                <span>Date:</span>
                <p>{corp.broadcastdate}</p>
                <span>Purpose:</span>
                <p>{corp.subject}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default StockInfo;
