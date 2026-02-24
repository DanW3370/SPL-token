/**
 * 一次性完成四步：
 * 1) 创建 Mint（6 位小数，mintAuthority=当前钱包，freezeAuthority=null → 无冻结权限）
 * 2) 为当前钱包创建/获取该 Mint 的关联代币账户（ATA）
 * 3) 按最小单位把 21,000,000 * 10^6 铸造到 ATA
 * 4) 读取并打印总供应与 ATA 余额（应一致）
 *
 * 核心概念：
 * - Mint 账户：代表某种代币的全局元数据（包含 decimals、铸币/冻结权限）。创建后需初始化。
 * - 冻结权限：设置为 null 即彻底关闭冻结能力，不能再开启（不可逆）。
 * - ATA（Associated Token Account）：(owner, mint) 决定的“标准持仓地址”，若不存在可由任何人代付租金创建一次。
 * - 铸造（mintTo）：需要“铸币权限”签名，目标必须是已存在的 Token Account（通常是 ATA）。
 */
import { Keypair } from "@solana/web3.js";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  getMint,
  getAccount,
} from "@solana/spl-token";
import { DECIMALS, HUMAN_SUPPLY } from "./config.js";
import { getConnection } from "./utils/connection.js";
import { loadKeypair, ensureAirdrop } from "./utils/wallet.js";
import { writeCache } from "./utils/cache.js";

(async () => {
  // 建立连接 & 加载钱包
  const connection = getConnection();
  const payer: Keypair = loadKeypair();
  await ensureAirdrop(payer.publicKey);

  // ① 创建并初始化 Mint：6 位小数；铸币权限=自己；冻结权限=null（无冻结权限）
  const mint = await createMint(connection, payer, payer.publicKey, null, DECIMALS);
  console.log("MINT =", mint.toBase58());

  // ② 获取/创建 ATA：标准做法是用 ATA 来持有某个 Mint 的余额
  const ata = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,               // 交易费由当前钱包支付
    mint,                // 哪个代币（Mint）
    payer.publicKey      // 持有人（Owner）
  );
  console.log("ATA  =", ata.address.toBase58());

  // ③ 计算最小单位并铸造：21,000,000 × 10^6
  const baseUnits = HUMAN_SUPPLY * (10n ** BigInt(DECIMALS));
  await mintTo(
    connection,
    payer,               // 费用支付者
    mint,                // Mint 地址
    ata.address,         // 目标 Token Account（ATA）
    payer,               // 铸币权限签名者（与创建时保持一致）
    Number(baseUnits)    // 注意：这里需要 number；21e6 * 1e6 不超过 JS 安全整数的场景请谨慎评估
  );

  // ④ 校验打印：读取总供应与 ATA 余额
  const mintInfo = await getMint(connection, mint);
  const ataInfo  = await getAccount(connection, ata.address);
  console.log("supply =", mintInfo.supply.toString());  // 21000000000000
  console.log("balance=", ataInfo.amount.toString());   // 21000000000000
  console.log(`人类可读余额 = ${Number(ataInfo.amount) / 10 ** DECIMALS} 枚`);

  // 写入缓存，便于分步脚本与 verify 使用
  writeCache({ mint: mint.toBase58(), ata: ata.address.toBase58() });
})();
``
