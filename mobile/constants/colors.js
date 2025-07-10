// constants/colors.js
const coffeeTheme = {
  primary: "#8B593E",
  background: "#FFF8F3",
  text: "#4A3428",
  border: "#E5D3B7",
  white: "#FFFFFF",
  textLight: "#9A8478",
  expense: "#E74C3C",
  income: "#2ECC71",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#27AE60",
  count: "#E67E22",
};

const forestTheme = {
  primary: "#2E7D32",
  background: "#E8F5E9",
  text: "#1B5E20",
  border: "#C8E6C9",
  white: "#FFFFFF",
  textLight: "#66BB6A",
  expense: "#C62828",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#27AE60",
  count: "#E67E22",
};

const purpleTheme = {
  primary: "#6A1B9A",
  background: "#F3E5F5",
  text: "#4A148C",
  border: "#D1C4E9",
  white: "#FFFFFF",
  textLight: "#BA68C8",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#27AE60",
  count: "#E67E22",
};

const oceanTheme = {
  primary: "#0277BD",
  background: "#E1F5FE",
  text: "#01579B",
  border: "#B3E5FC",
  white: "#FFFFFF",
  textLight: "#4FC3F7",
  expense: "#EF5350",
  income: "#26A69A",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#27AE60",
  count: "#E67E22",
  danger: "#ff5252",
  success: "#4caf50",
};

// 🌇 Sunset Theme
const sunsetTheme = {
  primary: "#FF7043",
  background: "#FFF3E0",
  text: "#BF360C",
  border: "#FFCCBC",
  white: "#FFFFFF",
  textLight: "#FFAB91",
  expense: "#D84315",
  income: "#43A047",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#FF5722",
  count: "#FF9800",
};


// 🌌 Midnight Theme (froid et sombre)
const midnightTheme = {
  primary: "#0D47A1",         // Bleu profond
  background: "#1A2238",      // Très sombre
  text: "#CFD8DC",            // Gris clair bleuté
  border: "#37474F",          // Gris froid foncé
  white: "#FFFFFF",           // Blanc froid
  textLight: "#90A4AE",       // Gris bleu clair
  expense: "#EF5350",         // Rouge désaturé
  income: "#26A69A",          // Vert froid
  card: "#121E2A",            // Carte sombre
  shadow: "#000000",
  amount: "#4DD0E1",          // Bleu-vert
  count: "#80DEEA",           // Bleu clair froid
  success: "#26A69A",         // Ajout pour cohérence
  danger: "#EF5350"           // Ajout pour cohérence
};


// 🍑 Peach Theme
const peachTheme = {
  primary: "#F48FB1",
  background: "#FFF0F3",
  text: "#AD1457",
  border: "#F8BBD0",
  white: "#FFFFFF",
  textLight: "#F06292",
  expense: "#E91E63",
  income: "#81C784",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#F06292",
  count: "#F9A825",
};

// 💧 Aqua Theme
const aquaTheme = {
  primary: "#009688",
  background: "#E0F2F1",
  text: "#004D40",
  border: "#B2DFDB",
  white: "#FFFFFF",
  textLight: "#4DB6AC",
  expense: "#D32F2F",
  income: "#388E3C",
  card: "#FFFFFF",
  shadow: "#000000",
  amount: "#00796B",
  count: "#FFA000",
};

export const THEMES = {
  coffee: coffeeTheme,
  forest: forestTheme,
  purple: purpleTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
  midnight: midnightTheme,
  peach: peachTheme,
  aqua: aquaTheme,
};

// 👇 change this to switch theme
export const COLORS = THEMES.ocean;
