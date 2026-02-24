/**
 * 查看当前钱包地址与 SOL 余额（lamports）。
 */
import { getConnection } from "../src/utils/connection.js";
import { loadKeypair } from "../src/utils/wallet.js";

(async () => {
  const conn = getConnection();
  const payer = loadKeypair();
  const bal = await conn.getBalance(payer.publicKey);
  console.log("Wallet =", payer.publicKey.toBase58());
  console.log("SOL    =", bal);
})();
