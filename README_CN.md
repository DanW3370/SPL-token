SPL Token 铸造项目（TypeScript / @solana/spl-token）
本项目是一个基于 TypeScript + @solana/web3.js + @solana/spl-token 的示例工程，用来在 Solana Devnet 上创建并铸造一个 SPL 代币。
你将通过此项目学会：
✔ 创建一个代币 Mint（6 位小数）
✔ 设置铸币权限（Mint Authority = 当前钱包）
✔ 禁用冻结权限（Freeze Authority = null）
✔ 创建关联代币账户 ATA（Associated Token Account）
✔ 铸造 21,000,000 代币（自动换算最小单位）
✔ 查询供应量与余额
非常适合 Solana 初学者快速理解 SPL Token 的基本逻辑与链上结构。

📁 项目结构
spl-token-mint-ts/
├─ package.json
├─ tsconfig.json
├─ .env                     # 私钥配置（不要上传到仓库）
├─ .gitignore
├─ .cache.json              # 自动生成，缓存 mint/ata 地址
├─ scripts/
│  ├─ check-balances.ts     # 查看钱包 SOL 余额
│  └─ verify.ts             # 验证 mint 供应 & ATA 余额
└─ src/
   ├─ utils/
   │  ├─ connection.ts      # 建立到 RPC 的连接
   │  ├─ wallet.ts          # 加载 keypair & 自动空投
   │  └─ cache.ts           # 读写缓存
   ├─ config.ts             # 全局配置（小数位/供应量）
   ├─ mint_all_in_one.ts    # 一次执行所有流程（推荐）
   ├─ 01_create_mint.ts     # 分步：创建 Mint
   ├─ 02_create_ata.ts      # 分步：创建/获取 ATA
   └─ 03_mint_21m.ts        # 分步：铸造 2100 万代币

⚙️ 环境配置
1. 安装依赖
Shellnpm installShow more lines
2. 配置私钥
编辑 .env 文件（任选其一）：
Plain Textenv isn’t fully supported. Syntax highlighting is based on Plain Text.# 方式 A：直接贴入 id.json 的 keypair 数组SECRET_KEY=[12,34,...,56]# 方式 B：从路径加载 keypair 文件# KEYPAIR_PATH=/Users/you/.config/solana/id.jsonShow more lines

🚀 运行方式
一键完成所有步骤（推荐）
Shellnpm run mint:allShow more lines
执行后会输出：
MINT = <Mint 地址>
ATA  = <ATA 地址>
supply = 21000000000000
balance= 21000000000000
人类可读余额 = 21000000 枚

校验结果
Shellnpm run verifyShow more lines

🧩 分步执行（更容易理解流程）
Shellnpm run mint:step:1   # 创建 Mint（6 位小数、无冻结权限）npm run mint:step:2   # 创建/获取 ATAnpm run mint:step:3   # 铸造 21,000,000 枚（换算成最小单位）npm run verify        # 校验结果Show more lines

🧠 核心概念解释（初学者必读）
1) Mint 账户是什么？

代表某种代币的“身份证”
内含：小数位、总供应、铸币权限、冻结权限等
铸币权限可以发币，冻结权限可以冻结账户（你已禁用）

2) 为什么要创建 ATA？
ATA = 钱包对某个 Mint 的“标准口袋”
由公式 (wallet, mint) 推导而成，任何人都能提前帮你创建（代付租金）。
3) 为什么铸造要转成最小单位？
Solana Token 以 最小单位 记录数量，
若 decimals = 6，则：
1 人类可读代币 = 1,000,000 最小单位

因此：
21,000,000 人类可读 = 21,000,000 × 10^6 = 21000000000000


🔐 关于权限（非常重要）


冻结权限 Freeze Authority = null（你已禁用）
此设置不可逆，未来无法冻结/解冻账户，适用于普通代币。


铸币权限 Mint Authority（当前仍有效）
只要保留此权限，你随时可以继续增发代币。


👉 想固定供应？
我可以帮你添加 lock-mint.ts 脚本，撤销铸币权限（不可逆）。

❗ 常见问题
1) 铸造时报错：insufficient funds
Devnet 需要少量 SOL 作为租金 & gas，脚本内已设计自动 airdrop。
如果失败，可手动：
Shellsolana airdrop 2Show more lines
2) Mint 供应与 ATA 余额不一致？
请确保你只运行过一次铸造脚本。

📌 后续扩展（如需我可继续写脚本给你）

给代币设置 名称/符号/图标（Metaplex Token Metadata）
链上创建 DEX 池（Raydium/Orca）
构建前端钱包转账页面（Next.js + Phantom）
用 Anchor 写一个可管理代币的智能合约（PDA）
