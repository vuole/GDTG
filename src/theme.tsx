import { createTheme } from "@mui/material";
import { viVN } from "@mui/material/locale";

const theme = createTheme(
  {
    palette: {
      primary: {
        light: "#29BA74",
        main: "#1DA462",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#6C809D",
      },
      grey: {
        "100": "#F1F5F9",
        "200": "#E2E8F0",
        "300": "#CBD5E1",
        "400": "#94A3B8",
        "500": "#6C809D",
        "600": "#475569",
        "700": "#334155",
        "800": "#1E293B",
        "900": "#0F172A",
      },
    },
    typography: {
      fontFamily: '"Inter", sans-serif',
    },
  },
  viVN
);

export default theme;
