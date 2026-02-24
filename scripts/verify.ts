/**
 * 读取并打印：
 * - Mint 的总供应（supply）
 * - ATA 的余额（amount）
 * 并换算为“人类可读”数量，便于对比。
 */
import { PublicKey } from "@solana/web3.js";
import { getAccount, getMint } from "@solana/spl-token";
import { readCache } from "../src/utils/cache.js";
import { getConnection } from "../src/utils/connection.js";
import { DECIMALS } from "../src/config.js";

(async () => {
  const { mint, ata } = readCache();
  if (!mint || !ata) throw new Error("缺少 mint 或 ata，请先运行主流程或分步脚本");

  const conn = getConnection();
  const mintInfo = await getMint(conn, new PublicKey(mint));
  const ataInfo  = await getAccount(conn, new PublicKey(ata));

  console.log("MINT   =", mint);
  console.log("ATA    =", ata);
  console.log("supply =", mintInfo.supply.toString());
  console.log("balance=", ataInfo.amount.toString());
  console.log(`人类可读：${Number(ataInfo.amount) / 10 ** DECIMALS}`);
})();
