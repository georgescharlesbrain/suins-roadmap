"use client";

import { useEffect, useState } from "react";

const RPC_URL = "https://fullnode.mainnet.sui.io:443";
const NS_TOKEN_TYPE = "0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS";
const BURN_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

// Fallback values in case API/RPC fails or is rate-limited
const FALLBACK_NS_BURNT = 2117828;
const FALLBACK_SUI_PRICE = 1.25;
const FALLBACK_NS_PRICE = 0.15;
const FALLBACK_TREASURY_USD = 145000;

interface TickerData {
  nsBurnt: number;
  nsPrice: number;
  suiPrice: number;
  treasuryUsd: number;
}

export function StatsTicker() {
  const [data, setData] = useState<TickerData>({
    nsBurnt: FALLBACK_NS_BURNT,
    nsPrice: FALLBACK_NS_PRICE,
    suiPrice: FALLBACK_SUI_PRICE,
    treasuryUsd: FALLBACK_TREASURY_USD,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        // 1. Fetch burnt NS balance from Sui RPC
        const rpcPromise = fetch(RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "suix_getAllBalances",
            params: [BURN_ADDRESS],
          }),
        }).then((r) => r.json());

        // 2. Fetch prices from CoinGecko
        const cgPromise = fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=suins-token,sui,usd-coin&vs_currencies=usd"
        ).then((r) => r.json());

        const [rpcResult, cgResult] = await Promise.all([rpcPromise, cgPromise]);

        const prices = {
          suins: cgResult["suins-token"]?.usd || FALLBACK_NS_PRICE,
          sui: cgResult["sui"]?.usd || FALLBACK_SUI_PRICE,
          usdc: cgResult["usd-coin"]?.usd || 1.0,
        };

        const nsBal = rpcResult?.result?.find(
          (b: any) => b.coinType === NS_TOKEN_TYPE
        );
        const nsBurnt = nsBal
          ? Number(nsBal.totalBalance) / 1_000_000
          : FALLBACK_NS_BURNT;

        // Fetch wallet balances for the main treasury account
        const walletAddr = "0x9b388a6da9dd4f73e0b13abc6100f1141782ef105f6f5e9d986fb6e00f0b2591";
        const walletPromise = fetch(RPC_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "suix_getAllBalances",
            params: [walletAddr],
          }),
        }).then((r) => r.json());

        // Fetch values for the three treasury vault objects (NS, USDC, SUI)
        const objectIds = [
          { id: "0x15842c6ed94d1f93e51bd9c324aa07c0a80e017406455383fce0b9132276e69f", symbol: "NS", decimals: 6 },
          { id: "0x451766ec55fb9df787eb37c2ead273fdba067da043c88cbe4866f2ddf33a1338", symbol: "USDC", decimals: 6 },
          { id: "0xbe847f00db9c9816222024e50e9024c18afc910c682a47026873527e102c132c", symbol: "SUI", decimals: 9 }
        ];

        const objPromises = objectIds.map((obj) =>
          fetch(RPC_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "sui_getObject",
              params: [obj.id, { showContent: true }],
            }),
          }).then((r) => r.json())
        );

        const [walletResult, ...objResults] = await Promise.all([
          walletPromise,
          ...objPromises
        ]);

        let totalTreasuryUsd = 0;

        // 1. Process wallet balances
        const walletBalances = walletResult?.result || [];
        walletBalances.forEach((bal: any) => {
          const amount = Number(bal.totalBalance);
          if (bal.coinType === NS_TOKEN_TYPE) {
            totalTreasuryUsd += (amount / 1_000_000) * prices.suins;
          } else if (bal.coinType === "0x2::sui::SUI") {
            totalTreasuryUsd += (amount / 1_000_000_000) * prices.sui;
          } else if (bal.coinType.includes("usdc::USDC")) {
            totalTreasuryUsd += (amount / 1_000_000) * prices.usdc;
          }
        });

        // 2. Process object balances
        objResults.forEach((res, index) => {
          const objMeta = objectIds[index];
          const valStr = res?.result?.data?.content?.fields?.value || "0";
          const amount = Number(valStr);
          if (amount > 0) {
            const price = objMeta.symbol === "NS" ? prices.suins : (objMeta.symbol === "SUI" ? prices.sui : prices.usdc);
            totalTreasuryUsd += (amount / (10 ** objMeta.decimals)) * price;
          }
        });

        setData({
          nsBurnt,
          nsPrice: prices.suins,
          suiPrice: prices.sui,
          treasuryUsd: totalTreasuryUsd > 0 ? totalTreasuryUsd : FALLBACK_TREASURY_USD,
        });
      } catch (error) {
        console.error("Failed to fetch live stats, using fallback:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    // Auto-update every 3 minutes
    const interval = setInterval(fetchStats, 180000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-navy text-white text-xs py-2 px-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-1 border-b border-white/10 font-medium">
      <div className="flex items-center gap-1.5">
        <span>Total Burnt:</span>
        <span className="font-bold text-aqua">
          {data.nsBurnt.toLocaleString(undefined, { maximumFractionDigits: 0 })} $NS
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span>Treasury Value:</span>
        <span className="font-bold text-aqua">
          ${data.treasuryUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span>$NS Price:</span>
        <span className="font-bold text-aqua">
          ${data.nsPrice.toFixed(4)}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <a
          href="https://suinstreasury.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="text-aqua hover:underline flex items-center gap-0.5 ml-2 font-semibold"
        >
          View Live Treasury Dashboard
        </a>
      </div>
    </div>
  );
}
