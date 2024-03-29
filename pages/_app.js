import AuthContextProvider from "@/contexts/AuthContext";
// import "@/styles/globals.css";
import "../styles/App.scss";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dynamic from "next/dynamic";
// import Header from "@/components/Header";

const Header = dynamic(
  () => {
    return import('@/components/Header');
  },
  { ssr: false } // This will load the component only on client side
);
export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  return (
    <AuthContextProvider>
      <Header />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
