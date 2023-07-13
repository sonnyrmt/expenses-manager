import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import PrivateRoute from "@/components/PrivateRoute";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components";

const theme = createTheme({
  typography: {
    fontFamily: "poppins, sans-serif",
  },
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />;
      </AuthProvider>
    </ThemeProvider>
  );
}
