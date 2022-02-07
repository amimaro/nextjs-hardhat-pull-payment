import { ethers } from "ethers";
import React from "react";

export const AppContext = React.createContext<{
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  account: string | null;
  network: number | null;
  isConnected: () => boolean;
  ethersConnectToMetamask: () => Promise<any> | void;
  disconnect: () => void;
}>({
  provider: null,
  signer: null,
  account: null,
  network: null,
  isConnected: () => false,
  ethersConnectToMetamask: () => {},
  disconnect: () => {},
});
