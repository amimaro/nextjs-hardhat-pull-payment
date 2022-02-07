import "../styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import useWalletConnect from "../hooks/useWalletConnect";
import { AppContext } from "../contexts/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  const walletConnect = useWalletConnect();
  return (
    <AppContext.Provider value={{ ...walletConnect }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
