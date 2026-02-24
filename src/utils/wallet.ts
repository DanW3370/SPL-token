/**
 * 加载本地钱包（Keypair）并在 Devnet 自动申请空投，确保有足够 SOL 支付租金与手续费。
 *
 * Keypair 两种加载方式：
 *   1) 从 .env 的 SECRET_KEY（id.json 内容）直接解析；
 *   2) 从 .env 的 KEYPAIR_PATH 指定路径读取。
 */
import "dotenv/config";
import { Keypair, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getConnection } from "./connection.js";
import fs from "fs";

export function loadKeypair(): Keypair {
  if (process.env.SECRET_KEY) {
    const secret = Uint8Array.from(JSON.parse(process.env.SECRET_KEY));
    return Keypair.fromSecretKey(secret);
  }
  if (process.env.KEYPAIR_PATH) {
    const raw = fs.readFileSync(process.env.KEYPAIR_PATH, "utf8");
    const secret = Uint8Array.from(JSON.parse(raw));
    return Keypair.fromSecretKey(secret);
  }
  throw new Error("请在 .env 设置 SECRET_KEY 或 KEYPAIR_PATH");
}

/**
 * 简易空投：当余额低于阈值（默认 0.5 SOL）时，自动申请 1 SOL。
 * 仅 Devnet 可用；主网/测试网不可空投。
 */
export async function ensureAirdrop(pubkey: PublicKey, minSol = 0.5) {
  const conn = getConnection();
  const bal = await conn.getBalance(pubkey);
  if (bal < minSol * LAMPORTS_PER_SOL) {
    const sig = await conn.requestAirdrop(pubkey, 1 * LAMPORTS_PER_SOL);
    await conn.confirmTransaction(sig, "confirmed");
  }
}
