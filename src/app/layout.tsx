"use client";
import SquareButton from "@/components/squarebutton";
// import type { Metadata } from 'next'
import Link from "next/link";
import Image from "next/image";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig, Chain } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";
// import { Inter } from 'next/font/google'
import "./globals.css";
import Button from "@/components/button";
import Navbar from "@/components/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";

// import { usePathname } from 'next/navigation'

// const inter = Inter({ subsets: ['latin'] })

// const bscTestnet: Chain = {
//   id: 97,
//   name: 'BNB Smart Chain Testnet1',
//   network: 'bscTestnet',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'BNB Smart Chain Testnet1',
//     symbol: 'tBNB',
//   },
//   rpcUrls: {
//     public: { http: ['https://endpoints.omniatech.io/v1/bsc/testnet/public'] },
//     default: { http: ['https://bsc-testnet.publicnode.com'] },
//   },
//   blockExplorers: {
//     default: { name: 'BscScan', url: 'https://testnet.bscscan.com/' },
//     etherscan: { name: 'BscScan', url: 'https://testnet.bscscan.com/' },
//   },
//   testnet: true,
// };

const { chains, publicClient } = configureChains([mainnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "test app",
  projectId: "ca4b5a2da050854b39f3fb4bdc848c53",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// export const metadata: Metadata = {
//   title: 'EVAVERSE',
//   description: 'Evaverse',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content="Eraverse" />
        <title>ERAVERSE</title>
      </head>
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            {children}
            <div className="screen_show">
              <div className="flex justify-center align-center absolute bottom-[80px] w-[100%]">
                <Navbar />
              </div>
            </div>
            <ToastContainer />
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
