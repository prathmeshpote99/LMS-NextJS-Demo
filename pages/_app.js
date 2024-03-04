import AuthContextProvider from "@/contexts/AuthContext";
// import "@/styles/globals.css";
import "@/styles/App.scss"
import { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
