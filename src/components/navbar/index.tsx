"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAccount, useBalance } from "wagmi";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

// Custom Components
import Button from "../button";
import SquareButton from "../squarebutton";
import ButtonSec from "../buttonsec";
import IconSymbol from "../icon";

// buttons
import ButtonMint from "../buttons/buttonMint";
import ConnectDisconnectButton from "../buttons/connect-disconnect";
import WalletConnectButton from "../buttons/wallet-connect";

// Green ripple
import GreenRippleGlow from "../GreenRippleGlow";
import ErrorNoerror from "../buttons/mintPage";

// get Contract Data
import {
  fetchWLPrice,
  fetchReservedPrice,
  fetchFcfsPrice,
  fetchListEndTime
  // fetchWlEndTime,
  // fetchReEndTime,
} from "@/hooks/useContractData";
import { projectConfig } from "@/config/config";
// Main
export default function Navbar() {
  const pathname = usePathname();
  const [connected, setConnected] = useState(false);

  const renderNavBasedOnPath = () => {
    return (
      <AnimatePresence>
        <motion.div
          className="bg-[#21212180] backdrop-blur rounded-xl p-1.5 flex items-center gap-5"
          layout
          transition={{ duration: 0.8 }}
        >
          {/* LogoTab component */}
          <motion.div layout>
            <LogoTab />
          </motion.div>

          {/* Green glowing */}
          <motion.div layout>
            <GreenRippleGlow />
          </motion.div>

          {/* Tabs navigaton */}

          <TabsGrp />
        </motion.div>
      </AnimatePresence>
    );
  };
  return <>{renderNavBasedOnPath()}</>;
}

{
  /* LogoTab component */
}
function LogoTab() {
  const pathname = usePathname();

  const renderLogoTabOnPath = () => {
    if (pathname == "/") {
      return (
        <div>
          <SquareButton src={"Logo"} />
        </div>
      );
    } else {
      return (
        <div>
          <Link href="/">
            <SquareButton src={"BackArrow"} />
          </Link>
        </div>
      );
    }
  };
  return <>{renderLogoTabOnPath()}</>;
}

function TabsGrp() {
  const renderTabGrpPath = () => {
    const pathname = usePathname();

    const { address, isConnecting, isDisconnected } = useAccount();
    const { data, isError, isLoading } = useBalance({
      address: address,
    });

    const { wlPrice, onWLPrice } = fetchWLPrice();
    const { reservedPrice, onReservedPrice } = fetchReservedPrice();
    const { fcfsPrice, onFcfsPrice } = fetchFcfsPrice();
    const { listEndTime, onListEndTime } = fetchListEndTime();
    // const { wlEndTime, onWLEndTime } = fetchWlEndTime();
    // const { reEndTime, onReEndTime } = fetchReEndTime();

    const [nftAmount, setNFTAmount] = useState("1");
    const [totalPrice, setTotalPrice] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [isCheckLoading, setCheckLoading] = useState(false);

    const currentTimestamp = new Date().getTime();

    const handleChange = async (e: any) => {
      const RE = /^\d*\.?\d{0,18}$/;
      if (e.target.value === ".") setNFTAmount("0");

      if (RE.test(e.currentTarget.value)) {
        if (e.target.value === "") {
          setTotalPrice("");
        } else {
          if (
            listEndTime &&
            listEndTime > 0 &&
            Number(listEndTime) * 1000 > currentTimestamp
          ) {
            const res = await fetch(`${projectConfig.wlproofapi}${address}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
            const wlproof = await res.json();

            if (wlproof?.proof.length > 0) {
              setTotalPrice((Number(e.target.value as any) * wlPrice).toFixed(3));
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
              setTotalPrice(
                (Number(e.target.value as any) * reservedPrice).toFixed(3)
              );
            }
          }
          if (
            listEndTime &&
            listEndTime > 0 &&
            Number(listEndTime) * 1000 < currentTimestamp
          ) {
            setTotalPrice(
              (Number(e.target.value as any) * fcfsPrice).toFixed(3)
            );
          }
        }
        setNFTAmount(e.target.value as any);
      }
    };

    useEffect(() => {
      (async () => {
        if (Number(nftAmount) > 0) {
          if (
            listEndTime &&
            listEndTime > 0 &&
            Number(listEndTime) * 1000 > currentTimestamp
          ) {
            setTotalPrice((Number(nftAmount) * wlPrice).toFixed(3));

            const res = await fetch(`${projectConfig.wlproofapi}${address}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
            const wlproof = await res.json();

            if (wlproof?.proof.length > 0) {
              setTotalPrice((Number(nftAmount) * wlPrice).toFixed(3));
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
              setTotalPrice((Number(nftAmount) * reservedPrice).toFixed(3));
            }

          }
          if (
            listEndTime &&
            listEndTime > 0 &&
            Number(listEndTime) * 1000 < currentTimestamp
          ) {
            setTotalPrice((Number(nftAmount) * fcfsPrice).toFixed(3));
          }
        } else {
          setNFTAmount("1");
        }
      })();
    }, [nftAmount, listEndTime, wlPrice, reservedPrice, fcfsPrice, address]);

    const getContractData = async () => {
      await onWLPrice();
      await onReservedPrice();
      await onFcfsPrice();
      await onListEndTime();
    };

    useEffect(() => {
      getContractData();
    }, [address]);

    if (pathname == "/studio") {
      return (
        <AnimatePresence>
          <motion.div
            className="flex bg-[#3E3E3E] rounded-lg p-[6px] h-full text-[#FAF9F6] gap-2"
            layout
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-enter items-center h-full px-[16.5px] rounded-lg gap-[8px]"
            // layout
            >
              {/* Danger sign */}
              <motion.div className="w-[20px] h-[20px]" layout>
                {/* modified classname home_fadeIn_L*/}

                <Image
                  src={"/danger.png"}
                  alt="danger"
                  width={20}
                  height={20}
                />
              </motion.div>

              <motion.p layout className="text-[14px] font-medium">
                {/*modified classname  home_fade_In_R*/}
                The Studio is coming soon!
              </motion.p>
            </motion.div>

            {/*  without adding `layout` gives much better experience*/}
            <motion.div layout className="flex gap-2">
              <Button title="Learn More" />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    } else if (pathname == "/") {
      return (
        <AnimatePresence>
          <motion.div
            className="bg-[#3E3E3E] rounded-lg p-[6px] h-full text-[#FAF9F6]"
            layout
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-2 h-full">
              <div className="flex gap-2 ">
                <motion.div layout>
                  <Link href="/community">
                    <ButtonSec title="Community" />
                  </Link>
                </motion.div>

                <motion.div layout>
                  <Link href="/studio">
                    <ButtonSec title="Studio" />
                  </Link>
                </motion.div>

                <motion.div layout>
                  <Link href="/shop">
                    <ButtonSec title="Shop" />
                  </Link>
                </motion.div>

                <motion.div layout>
                  <Link href="/walletchecker">
                    <ButtonSec title="Wallet Checker" />
                  </Link>
                </motion.div>

                <motion.div layout>
                  <Link href="/mint">
                    <ButtonMint title="Mint" />
                  </Link>
                </motion.div>

                <motion.div layout>
                  <ConnectDisconnectButton />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      );
    } else if (pathname == "/mint") {
      return (
        <AnimatePresence>
          <motion.div
            className="flex bg-[#3E3E3E] rounded-lg p-[6px] h-full text-[#FAF9F6] gap-2"
            layout
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-enter items-center h-full px-[16.5px] rounded-lg">
              {/* home_fade_In_R */}
              <motion.p layout className="text-[14px] font-medium">
                Mint
              </motion.p>
            </div>

            <div className="flex gap-2 ">
              {/* <ErrorNoerror /> */}
              <motion.div
                className="flex items-center justify-center border-[1px] rounded-lg border-solid border-[#4E4E4E]  w-[140px]"
                layout
              >
                {/* '+' button */}
                <div
                  className=" bg-[#3E3E3E]] cursor-pointer"
                  onClick={() =>
                    setNFTAmount((Number(nftAmount) + 1).toFixed(0))
                  }
                >
                  <Icon icon="ic:baseline-plus" />
                </div>

                <input
                  type="text"
                  placeholder="0"
                  className="text-center bg-transparent h-full px-[16.5px] focus: border-[#4E4E4E] focus:outline-none w-[80px]"
                  onChange={(e) => handleChange(e)}
                  value={nftAmount}
                />

                {/* '-' button */}
                <div
                  className=" bg-[#3E3E3E]] cursor-pointer"
                  onClick={() =>
                    setNFTAmount((Number(nftAmount) - 1).toFixed(0))
                  }
                >
                  <Icon icon="ic:baseline-minus" />
                </div>
              </motion.div>

              <motion.div
                layout
                className="flex items-center max-w-[155px] w-[155px] justify-center"
              >
                <p className="relative text-ellipsis overflow-hidden text-[14px]">
                  Total Price: {address && totalPrice ? totalPrice : 0} ETH
                </p>
              </motion.div>

              <motion.div layout>
                <WalletConnectButton
                  address={address}
                  nftAmount={nftAmount}
                  listEndTime={listEndTime}
                  getContractData={getContractData}
                  totalPrice={totalPrice}
                  setNFTAmount={setNFTAmount}
                />
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      );
    } else if (pathname == "/community") {
      return (
        <AnimatePresence>
          <motion.div
            className="flex bg-[#3E3E3E] rounded-lg p-[6px] h-full text-[#FAF9F6] gap-2"
            layout
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-enter items-center h-full px-[16.5px] rounded-lg">
              <motion.p layout className="text-[14px] font-medium">
                Community
              </motion.p>
            </div>

            {/* Can make a seperate component for the `communityIcons` and pass imges and links*/}
            <motion.div layout className="flex gap-2 ">
              <a href="https://discord.gg/eraverse" target="_blank">
                <IconSymbol src={"Discord_icon"} />
              </a>
              <a href="https://twitter.com/eraverseNFT" target="_blank">
                <IconSymbol src={"X_icon"} />
              </a>
              <a href="https://www.instagram.com/eraverse.x/" target="_blank">
                <IconSymbol src={"Instagram_icon"} />
              </a>
              <a href="https://mirror.xyz/" target="_blank">
                <IconSymbol src={"Mirror_icon"} />
              </a>
            </motion.div>

            <Button title="Get in Touch" />
          </motion.div>
        </AnimatePresence>
      );
    } else if (pathname == "/shop") {
      return (
        <AnimatePresence>
          <motion.div
            className="flex bg-[#3E3E3E] rounded-lg p-[6px] h-full text-[#FAF9F6] gap-2 "
            layout
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-enter items-center h-full px-[16.5px] rounded-lg">
              <motion.p layout className="text-[14px] font-medium">
                Shop
              </motion.p>
            </div>
            <motion.div layout className="flex gap-2">
              <ButtonSec title="Apparel" textcolor={true} />
              <ButtonSec title="Collectibles" textcolor={true} />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      );
    } else if (pathname == "/walletchecker") {
      const handleCheck = async () => {
        setCheckLoading(true);

        if (walletAddress === "") {
          toast.error("Input Wallet Address", {
            position: "top-right",
            autoClose: 4000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          setCheckLoading(false);
          return;
        }

        const res = await fetch(`${projectConfig.wlproofapi}${walletAddress}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const wlproof = await res.json();

        if (wlproof?.proof.length > 0) {
          toast.success("You're on whitelist", {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        const reproofres = await fetch(
          `${projectConfig.reservedproofapi}${walletAddress}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const reproof = await reproofres.json();

        if (wlproof?.proof && wlproof?.proof.length === 0 && reproof?.proof.length > 0) {
          toast.success("You're on reserved list", {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        if (wlproof?.proof?.length === 0 && reproof?.proof?.length === 0) {
          toast.success("You're on FCFS list", {
            position: "top-right",
            autoClose: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }

        setCheckLoading(false);
      };

      return (
        <AnimatePresence>
          <motion.div
            className="flex bg-[#3E3E3E] rounded-lg p-[6px] h-full text-[#FAF9F6] gap-2"
            layout
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-2">
              {/* <ErrorNoerror /> */}
              <motion.div
                layout
                className="items-center justify-center border-[1px] rounded-lg border-solid border-[#4E4E4E]"
              >
                <input
                  type="text"
                  placeholder="Input your ether wallet address"
                  className="bg-transparent h-full focus: border-[#4E4E4E] focus:outline-none w-[250px] mx-[15px]"
                  onChange={(e) => setWalletAddress(e.target.value)}
                  value={walletAddress}
                />
              </motion.div>
              {!isCheckLoading ? (
                <motion.div
                  layout
                  className={`cursor-pointer flex justify-enter items-center h-full px-[19.5px] border-[1px] border-[#222222] border-solid bg-[#222222] rounded-lg`}
                  onClick={handleCheck}
                >
                  <p className="text-[14px] ">Check</p>
                </motion.div>
              ) : (
                <motion.div layout>
                  {" "}
                  <Button title="Checking..." loading={true} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      );
    }
  };
  return <>{renderTabGrpPath()}</>;
}
