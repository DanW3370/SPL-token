/**
 * 分步③：把 21,000,000（人类可读）换算为最小单位并铸造到 ATA
 */
import { PublicKey } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { readCache } from "./utils/cache.js";
import { getConnection } from "./utils/connection.js";
import { loadKeypair } from "./utils/wallet.js";
import { DECIMALS, HUMAN_SUPPLY } from "./config.js";

(async () => {
  const { mint, ata } = readCache();
  if (!mint || !ata) throw new Error("请先完成 Step 1 与 Step 2");

  const conn = getConnection();
  const payer = loadKeypair();

  const amount = HUMAN_SUPPLY * (10n ** BigInt(DECIMALS)); // 21000000000000
  await mintTo(
    conn,
    payer,
    new PublicKey(mint),
    new PublicKey(ata),
    payer,
    Number(amount)
  );
  console.log("铸造完成！");
})();
