import React, { useState, useEffect } from "react";
import Image from "next/image";
import { writeContract, waitForTransaction } from '@wagmi/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { toast } from "react-toastify";
import { projectConfig } from "@/config/config";
import { contractABI } from "@/config/contractABI";
import { parseEther, parseUnits } from 'viem'

function WalletConnectButton({ nftAmount, address, listEndTime, getContractData, totalPrice, setNFTAmount }: { nftAmount: any, listEndTime: any, getContractData: any, totalPrice: any, setNFTAmount: any, address: any }) {
  const [connected, setConnected] = useState(false);
  const [isWLloading, setWLLoading] = useState(false);
  const [isREloading, setRELoading] = useState(false);
  const [isFCloading, setFCLoading] = useState(false);
  const [isPubloading, setPubLoading] = useState(false);
  const [isWL, setWL] = useState(false);
  const [isRE, setRE] = useState(false);

  const currentTimestamp = new Date().getTime();

  
  useEffect(() => {
    (async () => {
      if (address && listEndTime) {
        const res = await fetch(`${projectConfig.wlproofapi}${address}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const wlproof = await res.json();

        if (wlproof?.proof.length > 0) {
          setWL(true);
        }

        const reproofres = await fetch(
          `${projectConfig.reservedproofapi}${address}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const reproof = await reproofres.json();

        if (wlproof?.proof && wlproof?.proof.length === 0 && reproof?.proof.length > 0) {
          setRE(true);
        }
      }
    })();
  }, [address, listEndTime]);

  return (
    <>
      <div className="h-full mint-btn">
        {/* {!connected && (
          <Image src={"/danger.svg"} width={20} height={20} alt="icon" />
        )} */}
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
                    height: '100%'
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]">
                        <Image src={"/danger.svg"} width={20} height={20} alt="icon" />
                        <button style={{ color: "#78DD64" }} onClick={openConnectModal} type="button">
                          Connect
                        </button>
                      </div>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]">
                        <Image src={"/danger.svg"} width={20} height={20} alt="icon" />
                        <button style={{ color: "#EF4040" }} onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      </div>
                    );
                  }

                  return (
                    <>
                      {
                        (listEndTime === 0) &&
                        <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]">
                          Mint
                        </div>
                      }
                      {
                        (listEndTime) > 0 && (Number(listEndTime) * 1000 > currentTimestamp) && isWL &&
                        <>
                          {
                            isWLloading ? <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]">
                              Minting ...
                            </div>
                              :
                              <WLMintBtn account={account} setWLLoading={setWLLoading} getContractData={getContractData} nftAmount={nftAmount} totalPrice={totalPrice} setNFTAmount={setNFTAmount} />
                          }
                        </>
                      }
                      {
                        (listEndTime) > 0 && (Number(listEndTime) * 1000 > currentTimestamp) && isRE && !isWL &&
                        <>
                          {
                            isREloading ?
                              <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]">
                                Minting ...
                              </div>
                              :
                              <REMintBtn account={account} setRELoading={setRELoading} getContractData={getContractData} nftAmount={nftAmount} totalPrice={totalPrice} setNFTAmount={setNFTAmount} />
                          }
                        </>
                      }
                      {
                        (listEndTime > 0) && (Number(listEndTime) * 1000 < currentTimestamp) &&
                        <>
                          {
                            isFCloading ?
                              <div className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]">
                                Minting ...
                              </div>
                              :
                              <FCMintBtn setFCLoading={setFCLoading} getContractData={getContractData} nftAmount={nftAmount} totalPrice={totalPrice} setNFTAmount={setNFTAmount} />
                          }
                        </>
                      }
                    </>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom >
      </div >
    </>
  );
}

export default WalletConnectButton;

const WLMintBtn = ({ account, setWLLoading, getContractData, nftAmount, totalPrice, setNFTAmount }: { setWLLoading: any, getContractData: any, nftAmount: any, totalPrice: any, setNFTAmount: any, account: any }) => {

  const handleMint = async () => {
    setWLLoading(true);

    const res = await fetch(`${projectConfig.wlproofapi}${account.address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const wlproof = await res.json();

    try {
      const { hash } = await writeContract({
        address: projectConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: "mintWL",
        args: [
          wlproof.proof as `0x${string}`[],
          nftAmount
        ],
        value: parseEther(String(Number(totalPrice))),
      })
      const res = await waitForTransaction({
        hash,
      })

      console.log("data ==> ", res, hash)

      if (res?.blockHash) {
        console.log(res?.blockHash);

        toast.success("Mint successful", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        getContractData();
      }

    } catch (err: any) {
      console.log("err ==> ", err);

      if (String(err).includes("WL mint Not available")) {
        toast.error("WL mint Not available", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Exceeds presale limit")) {
        toast.error("Exceeds presale limit", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Insufficient funds")) {
        toast.error("Insufficient funds", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Invalid Merkle proof")) {
        toast.error("You are not whiltelist user", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("This error could arise when the account does not have enough funds to")) {
        toast.error("Insufficient funds", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }

    setWLLoading(false);
    setNFTAmount('');
  }

  return (
    <div
      className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]"
      onClick={handleMint}
    >
      Mint
    </div>
  )
}

const REMintBtn = ({ setRELoading, getContractData, nftAmount, totalPrice, setNFTAmount, account }: { setRELoading: any, getContractData: any, nftAmount: any, totalPrice: any, setNFTAmount: any, account: any }) => {

  const handleMint = async () => {
    setRELoading(true);

    const res = await fetch(`${projectConfig.reservedproofapi}${account.address}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const reproof = await res.json();

    try {
      const { hash } = await writeContract({
        address: projectConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: "mintReserved",
        args: [
          reproof.proof as `0x${string}`[],
          nftAmount
        ],
        value: parseEther(String(Number(totalPrice))),
      })
      const res = await waitForTransaction({
        hash,
      })

      console.log("data ==> ", res, hash)

      if (res?.blockHash) {
        console.log(res?.blockHash);

        toast.success("Mint successful", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        getContractData();
      }

    } catch (err: any) {
      console.log("err ==> ", err);

      if (String(err).includes("Reserved Mint Not available")) {
        toast.error("Reserved Mint Not available", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Exceeds reserved limit")) {
        toast.error("Exceeds reserved limit", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Insufficient funds")) {
        toast.error("Insufficient funds", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Invalid Merkle proof")) {
        toast.error("You are not reservelist user", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("This error could arise when the account does not have enough funds to")) {
        toast.error("Insufficient funds", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }

    setRELoading(false);
    setNFTAmount('');
  }

  return (
    <div
      className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]"
      onClick={handleMint}
    >
      Mint
    </div>
  )
}

const FCMintBtn = ({ setFCLoading, getContractData, nftAmount, totalPrice, setNFTAmount }: { setFCLoading: any, getContractData: any, nftAmount: any, totalPrice: any, setNFTAmount: any }) => {

  const handleMint = async () => {
    setFCLoading(true);

    try {
      const { hash } = await writeContract({
        address: projectConfig.contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: "mintFCFS",
        args: [
          nftAmount
        ],
        value: parseEther(String(Number(totalPrice))),
      })
      const res = await waitForTransaction({
        hash,
      })

      console.log("data ==> ", res, hash)

      if (res?.blockHash) {
        console.log(res?.blockHash);

        toast.success("Mint successful", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        getContractData();
      }

    } catch (err: any) {
      console.log("err ==> ", err);

      if (String(err).includes("FCFS Mint Not available")) {
        toast.error("FCFS Mint Not available", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Exceeds public limit")) {
        toast.error("Exceeds public limit", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("Insufficient funds")) {
        toast.error("Insufficient funds", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }

      if (String(err).includes("This error could arise when the account does not have enough funds to")) {
        toast.error("Insufficient funds", {
          position: "top-right",
          autoClose: 4000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }

    setFCLoading(false);
    setNFTAmount('');
  }

  return (
    <div
      className="cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg gap-[10px]"
      onClick={handleMint}
    >
      Mint
    </div>
  )
}