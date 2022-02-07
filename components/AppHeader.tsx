export const AppHeader: React.FC<{
  account: string;
  isConnected: () => boolean;
  disconnect: () => void;
  connectToMetamask: any;
}> = ({ account, isConnected, disconnect, connectToMetamask }) => {
  return (
    <div className="flex flex-col gap-4 items-end sm:flex-row sm:gap-0">
      <div className="flex-grow">
        <h1 className="text-3xl font-bold">
          NextJS+Hardhat PullPayment Example
        </h1>
      </div>
      <div className="flex-shrink">
        {isConnected() && (
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">
              {account?.substring(0, 5)}...
              {account?.substring(account.length - 4)}
            </h2>
            <button
              className="px-4 py-2 rounded-md bg-gray-500 active:bg-gray-600 text-white font-bold shadow-md"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </div>
        )}
        {!isConnected() && (
          <button
            className="px-4 py-2 rounded-md bg-orange-500 active:bg-orange-600 text-white font-bold shadow-md"
            onClick={() => connectToMetamask()}
          >
            Connect to metamask
          </button>
        )}
      </div>
    </div>
  );
};
