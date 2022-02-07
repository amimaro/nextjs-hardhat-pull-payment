import { ethers } from "ethers";
import React from "react";

export const AppContext = React.createContext<{
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  account: string | null;
  network: number | null;
  isConnected: () => boolean;
  connectToMetamask: () => Promise<any> | void;
  disconnect: () => void;
}>({
  provider: null,
  signer: null,
  account: null,
  network: null,
  isConnected: () => false,
  connectToMetamask: () => {},
  disconnect: () => {},
});
