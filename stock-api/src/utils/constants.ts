export const baseUrl = "http://192.168.1.93:4000";
export const autocompleteUrl = "/v1/nse/autocomplete/";
export const stockInfoUrl = (stock: string) => `/v1/nse/stockinfo/${stock}`;
