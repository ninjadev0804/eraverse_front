import React, { useState } from "react";
import Image from "next/image";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConnectDisconnectButton() {
  const [connected, setConnected] = useState(false);

  const handleButtonClick = () => {
    setConnected((prevConnected) => !prevConnected);
  };

  return (
    <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button style={{ color: "#78DD64" }} onClick={openConnectModal} type="button">
                      Connect
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button style={{ color: "#EF4040" }} onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      {/* <button
          onClick={handleButtonClick}
          className={`text-[14px] ${connected ? "text-[#EF4040]" : "text-[#78DD64]"
            }`}
        >
          {connected ? (
            <div className="flex gap-[8px] items-center justify-center home_fade_In_R">
              <div className="h-[20px] w-[20px]">
                <Image src={"/disconnect.png"} alt="disconnect" width={20} height={20}/>
              </div>
              <p className="">Disconnect</p>
            </div>
          ) : (
            <p className="home_fade_In_R">Connect</p>
          )}
        </button> */}
    </div>
  );
}
