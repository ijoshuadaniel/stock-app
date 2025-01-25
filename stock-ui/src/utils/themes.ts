export interface themeProp {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  success: string;
  error: string;
  neutral: string;
  border: string;
  cardBg: string;
  highlight: string;
  selected: string;
  skeleton: string;
  black: string;
  white: string;
}

export interface themes {
  dark: themeProp;
  light: themeProp;
}

const themes: themes = {
  light: {
    background: "#F7F7F7",
    text: "#2C3E50",
    primary: "#27AE60",
    secondary: "#9B59B6",
    success: "#2ECC71",
    error: "#E74C3C",
    neutral: "#BDC3C7",
    border: "#E0E0E0",
    cardBg: "#FFFFFF",
    highlight: "#F1C40F",
    selected: "#D32F2F",
    skeleton: "#BDC3C7",
    black: "#000000",
    white: "#FFFFFF",
  },
  dark: {
    background: "#181818",
    text: "#ECF0F1",
    primary: "#27AE60",
    secondary: "#9B59B6",
    success: "#2ECC71",
    error: "#E74C3C",
    neutral: "#95A5A6",
    border: "#444444",
    cardBg: "#2C3E50",
    highlight: "#F1C40F",
    selected: "#D32F2F",
    skeleton: "#7F8C8D",
    black: "#000000",
    white: "#FFFFFF",
  },
};
export type Theme = keyof typeof themes;
export default themes;
