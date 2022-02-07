import { BigNumber, ethers } from "ethers";
import React from "react";

export const AppContext = React.createContext<{
  provider: ethers.providers.JsonRpcProvider | null;
  signer: ethers.providers.JsonRpcSigner | null;
  account: string | null;
  network: number | null;
  balance: BigNumber | null;
  contractBalance: BigNumber | null;
  contract: ethers.Contract | null;
  isConnected: () => boolean;
  connectToMetamask: () => Promise<any> | void;
  disconnect: () => void;
  updateBalance: (address: string) => Promise<any> | void;
}>({
  provider: null,
  signer: null,
  account: null,
  network: null,
  balance: null,
  contractBalance: null,
  contract: null,
  isConnected: () => false,
  connectToMetamask: () => {},
  disconnect: () => {},
  updateBalance: () => {},
});
