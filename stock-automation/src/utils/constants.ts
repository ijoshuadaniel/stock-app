export const baseUrl = "https://nseindia.com";
export const gainers = "/api/live-analysis-variations?index=gainers";
export const loosers = "/api/live-analysis-variations?index=loosers";
export const marketStatus = "/api/marketStatus";
export const totalMarket =
  "/api/equity-stockIndices?index=NIFTY%20TOTAL%20MARKET";
export const mostActiveVolume =
  "/api/live-analysis-most-active-securities?index=volume&limit=10";
export const mostActiveValue =
  "/api/live-analysis-most-active-securities?index=value&limit=10";
export const optionsUrl = "/api/equity-stockIndices?index=";
export const mostActiveStocks =
  "/api/live-analysis-most-active-securities?index=volume";
export const gainersLoosersUrl = "/api/live-analysis-variations?index=";
export const equity = "/api/equity-stock?index=allcontracts";
export const allstocks = "/api/underlying-information";
export const autocomplete = "/api/search/autocomplete?q=";

// const functions
export const equityMetaInfo = (stock: string) =>
  `/api/equity-meta-info?symbol=${stock}`;
export const quoteEquityMetaInfo = (stock: string) =>
  `/api/quote-equity?symbol=${stock}`;
export const corpInfo = (stock: string) =>
  `/api/top-corp-info?symbol=${stock}&market=equities`;
export const chartInfoData = (stock: string) =>
  `/api/chart-databyindex-dynamic?index=${stock}EQN&type=symbol`;

// extra options
export const optionsSymbol = [
  "NIFTY 50",
  "NIFTY BANK",
  "NIFTY AUTO",
  "NIFTY IT",
];

// headaers
export const baseHeaders = {
  authority: "www.nseindia.com",
  referer: "https://www.nseindia.com/",
  accept: "*/*",
  origin: "https://www.nseindia.com",
  "accept-Language": "en-US,en;q=0.9",
  "accept-Encoding": "gzip, deflate, br",
  Connection: "keep-alive",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/80.0.3987.149 Safari/537.36",
};
