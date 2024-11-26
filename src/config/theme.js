// theme.js
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fff",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#242424",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#242424",
      paper: "#424242",
    },
    text: {
      primary: "#fff",
    },
  },
});
