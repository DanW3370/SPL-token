SPL Token Minting Project (TypeScript / @solana/spl-token)
This project demonstrates how to create and mint an SPL token on Solana Devnet using TypeScript, @solana/web3.js, and @solana/spl-token.
With this project, you will learn:
✔ How to create a token Mint (6 decimals)
✔ How to set the Mint Authority (your wallet)
✔ How to disable Freeze Authority (freezeAuthority = null)
✔ How to create an Associated Token Account (ATA)
✔ How to mint 21,000,000 tokens (converted to smallest units)
✔ How to verify total supply & balance
Perfect for Solana beginners.

📁 Project Structure
spl-token-mint-ts/
├─ package.json
├─ tsconfig.json
├─ .env                     # private key config
├─ .gitignore
├─ .cache.json              # auto-generated cache for mint/ata
├─ scripts/
│  ├─ check-balances.ts     # check wallet SOL balance
│  └─ verify.ts             # verify mint supply & ATA balance
└─ src/
   ├─ utils/
   │  ├─ connection.ts      # RPC connection
   │  ├─ wallet.ts          # load keypair & auto-airdrop
   │  └─ cache.ts           # cache utility
   ├─ config.ts             # global config
   ├─ mint_all_in_one.ts    # run full minting pipeline
   ├─ 01_create_mint.ts     # step 1: create mint
   ├─ 02_create_ata.ts      # step 2: create/get ATA
   └─ 03_mint_21m.ts        # step 3: mint 21M tokens


⚙️ Setup
Install dependencies
Shellnpm installShow more lines
Configure your private key
Add this to .env:
Plain Textenv isn’t fully supported. Syntax highlighting is based on Plain Text.SECRET_KEY=[12,34,...,56]# or# KEYPAIR_PATH=/path/to/id.jsonShow more lines

🚀 Run the script
One-click complete flow (recommended)
Shellnpm run mint:allShow more lines
You will see:
MINT = <Mint address>
ATA  = <ATA address>
supply = 21000000000000
balance= 21000000000000
Human readable = 21000000 tokens

Verify the result
Shellnpm run verifyShow more lines

🧩 Step-by-step execution
Shellnpm run mint:step:1   # Create mintnpm run mint:step:2   # Create/get ATAnpm run mint:step:3   # Mint 21,000,000 tokensnpm run verifyShow more lines

🧠 Key Concepts
Mint Account
The “identity card” of your token.
Stores: decimals, mint authority, freeze authority, supply.
ATA (Associated Token Account)
The standard token account for a wallet + mint pair.
Deterministic, easy to find, widely supported.
Smallest Unit
If decimals = 6:
1 token = 1,000,000 base units

So:
21,000,000 tokens = 21,000,000 × 10^6


🔐 About Authorities
Freeze authority = null
Disabled permanently.
Mint authority = your wallet
You can still mint more tokens.
👉 Want fixed supply?
I can add a script to revoke mint authority (one-way).

❗ Troubleshooting
“insufficient funds”
Your wallet needs a small amount of SOL.
Auto-airdrop is included, but you can also run:
Shellsolana airdrop 2Show more lines

📌 Next Steps (optional)

Add Metadata (name, symbol, image) via Metaplex
Deploy token to Mainnet
Build a swap pool (Raydium / Orca)
Build a UI for transfer & displaying balances
Write Anchor programs interacting with SPL tokens
