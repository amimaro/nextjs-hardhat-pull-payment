import { BigNumber, ethers } from "ethers";

export const formatEther = (balance: BigNumber) => {
  if (!balance) {
    return null;
  }
  return (+ethers.utils.formatEther(balance)).toFixed(4);
};
