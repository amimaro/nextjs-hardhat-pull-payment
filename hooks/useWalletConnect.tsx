import { BigNumber, ethers } from "ethers";
import { useState, useEffect } from "react";
import PaymentManager from "../PaymentManager.json";

export default function useWalletConnect() {
  const [provider, setProvider] =
    useState<ethers.providers.JsonRpcProvider | null>(null);
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner | null>(
    null
  );
  const [account, setAccount] = useState<string | null>(null);
  const [network, setNetwork] = useState<number | null>(null);
  const [balance, setBalance] = useState<BigNumber | null>(null);
  const [contractBalance, setContractBalance] = useState<BigNumber | null>(
    null
  );
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const fetchSelectedNetwork = async () => {
    return (window as any).ethereum.request({ method: "eth_chainId" });
  };

  const handleChainChanged = () => {
    window.location.reload();
  };

  const handleAccountsChanged = (accounts: string[]) => {
    setAccount(accounts.length === 0 ? null : accounts[0]);
    updateBalance(accounts[0]);
  };

  useEffect(() => {
    const handleEthereum = async () => {
      const ethereum = (window as any).ethereum;

      if (typeof ethereum === "undefined") {
        console.log("MetaMask is not installed!");
        return;
      }

      /*****************************************/
      /* Detect the MetaMask Ethereum provider */
      /*****************************************/
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setProvider(provider);

      /**********************************************************/
      /* Handle chain (network) and chainChanged (per EIP-1193) */
      /**********************************************************/
      const chainId = await fetchSelectedNetwork();
      setNetwork(parseInt(chainId));
      // Recommended reloading the page, unless you must do otherwise
      ethereum.on("chainChanged", handleChainChanged);

      /***********************************************************/
      /* Handle user accounts and accountsChanged (per EIP-1193) */
      /***********************************************************/
      const accounts = await ethereum.request({ method: "eth_accounts" });
      setAccount(accounts.length === 0 ? null : accounts[0]);
      handleAccountsChanged(accounts);
      ethereum.on("accountsChanged", handleAccountsChanged);
    };
    setTimeout(handleEthereum, 100);

    return () => {
      (window as any).ethereum.removeListener(
        "chainChanged",
        handleChainChanged
      );
      (window as any).ethereum.removeListener(
        "accountsChanged",
        handleAccountsChanged
      );
    };
  }, []);

  useEffect(() => {
    const balanceInterval = setInterval(async () => {
      if (!contract || !account) return;
      const balanceBN = await contract?.payments(account);
      await updateBalance(account);
      setContractBalance(balanceBN);
    }, 1000);

    return () => {
      clearInterval(balanceInterval);
    };
  }, [contract, account]);

  const connectToMetamask = async () => {
    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await fetchSelectedNetwork();
      setNetwork(parseInt(chainId));
      const signer = provider!.getSigner();
      setAccount(accounts[0]);
      setSigner(signer);
      await updateBalance(accounts[0]);
      setContract(
        new ethers.Contract(
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "",
          PaymentManager.abi,
          signer
        )
      );
    } catch (error: any) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.");
      } else {
        console.error(error);
      }
    }
  };

  const disconnect = () => {
    setSigner(null);
    setAccount(null);
    setNetwork(null);
    setContract(null);
    setBalance(null);
    setContractBalance(null);
  };

  const isConnected = () => {
    return !!signer;
  };

  const updateBalance = async (address: string) => {
    const balanceBN = await provider?.getBalance(address);
    if (!!balanceBN) {
      setBalance(balanceBN);
    }
  };

  return {
    provider,
    signer,
    account,
    network,
    balance,
    contractBalance,
    contract,
    isConnected,
    connectToMetamask,
    disconnect,
    updateBalance,
  };
}
