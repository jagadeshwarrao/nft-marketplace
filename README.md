# 🖼️ NFT Marketplace (Solidity, Hardhat, IPFS, Polygon)

A decentralized NFT Marketplace built with **Solidity**, **Hardhat**, **React**, and **Node.js**, supporting **ERC-721 NFTs** with **royalty support (EIP-2981)**.  
NFT metadata and assets are stored on **IPFS** for full decentralization, and contracts are deployed on the **Polygon Testnet**.

---

## 🚀 Features

- **ERC-721 Compliant NFT Minting**
- **Royalty Support (EIP-2981)** for creators on secondary sales
- **Decentralized Metadata Storage** using [NFT.Storage](https://nft.storage)
- **React Frontend** for user interaction
- **Node.js / Express Backend**
- **Hardhat** for development, testing, and deployment
- **Polygon (Mumbai)** network integration
- **Smart Contract Verification** via the Hardhat Etherscan plugin
- **Wallet Connectivity** using Web3.js / Ethers.js

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Smart Contracts | Solidity, OpenZeppelin, Hardhat |
| Backend | Node.js, Express |
| Frontend | React, TailwindCSS |
| Storage | IPFS via NFT.Storage |
| Blockchain | Polygon (Mumbai Testnet) |
| Wallet | MetaMask, Ethers.js |

---

## 📂 Project Structure

nft-marketplace/
│
├── contracts/
│ ├── MyNFT.sol # ERC-721 NFT Contract with Royalties
│ └── NFTMarketplace.sol # Marketplace Contract for Listing & Selling NFTs
│
├── scripts/
│ └── deploy.js # Hardhat Deployment Script
│
├── test/
│ └── test.js # Smart Contract Tests
│
├── frontend/ # React Frontend (optional)
│ └── src/
│
├── .env # Environment variables (never commit this)
├── hardhat.config.js # Hardhat Configuration
├── package.json
└── README.md

---

## ⚙️ Setup & Installation

### 1. Clone the Repository

```shell
git clone https://github.com/<your-username>/nft-marketplace.git
cd nft-marketplace
```

### 2. Install Dependencies

```shell
npm install
```
### 3. Configure Environment Variables

Create a .env file in the project root:

```shell
POLYGON_MUMBAI_RPC=https://polygon-mumbai.g.alchemy.com/v2/yourAlchemyKey
DEPLOYER_PRIVATE_KEY=0xyourmetamaskprivatekey
POLYGONSCAN_API_KEY=yourPolygonscanKey
NFT_STORAGE_KEY=yourNftStorageKey
```

### 4. Compile Contracts

```shell
npx hardhat compile
```

### 5. Deploy to Polygon Mumbai

```shell
npx hardhat run scripts/deploy.js --network mumbai
```

### 6. Verify on Polygonscan

```shell
npx hardhat verify --network mumbai <contract_address>
```


🔒 Environment Variables

| Variable               | Description                          |
| ---------------------- | ------------------------------------ |
| `POLYGON_MUMBAI_RPC`   | Alchemy/Infura RPC URL               |
| `DEPLOYER_PRIVATE_KEY` | Wallet private key for deployment    |
| `POLYGONSCAN_API_KEY`  | API key for contract verification    |
| `NFT_STORAGE_KEY`      | NFT.Storage API key for IPFS uploads |


🧰 Tools Used

Hardhat
OpenZeppelin Contracts
NFT.Storage
Ethers.js
Polygon Mumbai Testnet


📜 License

This project is licensed under the MIT License.
Feel free to use and modify it for your own NFT projects.


🤝 Acknowledgements

OpenZeppelin
Alchemy
Polygon
NFT.Storage



