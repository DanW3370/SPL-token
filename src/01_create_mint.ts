/**
 * 分步①：只创建 Mint（6 位小数，冻结权限=null）
 */
import { createMint } from "@solana/spl-token";
import { getConnection } from "./utils/connection.js";
import { loadKeypair, ensureAirdrop } from "./utils/wallet.js";
import { writeCache } from "./utils/cache.js";
import { DECIMALS } from "./config.js";

(async () => {
  const conn = getConnection();
  const payer = loadKeypair();
  await ensureAirdrop(payer.publicKey);

  const mint = await createMint(conn, payer, payer.publicKey, null, DECIMALS);
  console.log("MINT =", mint.toBase58());

  writeCache({ mint: mint.toBase58() });
})();
