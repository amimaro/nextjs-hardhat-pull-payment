import { ethers } from "ethers";
import React from "react";

export const AppContext = React.createContext<{
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  account: string | null;
  network: number | null;
  balance: string | null;
  isConnected: () => boolean;
  connectToMetamask: () => Promise<any> | void;
  disconnect: () => void;
  updateBalance: () => Promise<any> | void;
}>({
  provider: null,
  signer: null,
  account: null,
  network: null,
  balance: null,
  isConnected: () => false,
  connectToMetamask: () => {},
  disconnect: () => {},
  updateBalance: () => {},
});
