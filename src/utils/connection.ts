/**
 * 建立到 Solana 节点的连接。
 * 默认使用 Devnet；你也可以通过环境变量覆盖为自定义 RPC。
 */
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { RPC } from "../config.js";

export function getConnection(): Connection {
  const endpoint = RPC || clusterApiUrl("devnet");
  return new Connection(endpoint, "confirmed"); // "confirmed" 适合一般开发
}
