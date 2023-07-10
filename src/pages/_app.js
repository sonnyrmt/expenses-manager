import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "poppins, sans-serif",
  },
  palette: {
    mode: "dark",
    // primary: {
    //   main: "#a9a9a9",
    // },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
