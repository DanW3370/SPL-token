/**
 * 全局配置（可按需修改）
 *
 * - DECIMALS：代币小数位。SPL Token 按“最小单位”记账，
 *   最小单位 = 1 / (10^DECIMALS)。例如 DECIMALS=6，则 1 单位人类可读 = 1,000,000 最小单位。
 *
 * - HUMAN_SUPPLY：人类可读的铸造数量（不包含小数转换），真正上链时会乘以 10^DECIMALS。
 *
 * - RPC：默认使用 Devnet 的公共 RPC；也可以在 .env 里配置 RPC_URL 覆盖。
 */
export const DECIMALS = 6;
export const HUMAN_SUPPLY = 21_000_000n; // 2,100 万（人类可读）
export const RPC = process.env.RPC_URL || "https://api.devnet.solana.com";
