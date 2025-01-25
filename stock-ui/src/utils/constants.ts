export const rupees = "₹";
export const baseUrl = "http://192.168.1.82:3000";

export const baseHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-XSS-Protection": "1; mode=block",
  "Cache-Control": "no-store",
  Authorization: `Bearer YOUR_ACCESS_TOKEN_HERE`,
  "Referrer-Policy": "no-referrer",
  "Feature-Policy": "geolocation 'none'; microphone 'none';",
};

export const pages = {
  stock: "Stock",
  stockInfo: "StockInfo",
};
