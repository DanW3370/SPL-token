import { Connection, clusterApiUrl } from "@solana/web3.js";
import { RPC } from "../config.js";

export function getConnection(): Connection {
  const endpoint = RPC || clusterApiUrl("devnet");
  return new Connection(endpoint, "confirmed");
}
