/**
 * 分步②：只负责为 (owner=当前钱包, mint=上一步创建的 Mint) 创建或获取 ATA
 */
import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { readCache, writeCache } from "./utils/cache.js";
import { getConnection } from "./utils/connection.js";
import { loadKeypair, ensureAirdrop } from "./utils/wallet.js";

(async () => {
  const { mint } = readCache();
  if (!mint) throw new Error("未找到 mint，请先运行 Step 1（创建 Mint）");

  const conn = getConnection();
  const payer = loadKeypair();
  await ensureAirdrop(payer.publicKey);

  const ata = await getOrCreateAssociatedTokenAccount(
    conn,
    payer,
    new PublicKey(mint),
    payer.publicKey
  );
  console.log("ATA =", ata.address.toBase58());

  writeCache({ ata: ata.address.toBase58() });
})();
