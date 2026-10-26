# ABC Upgradable Smart Contracts

> Scaffolded with [abc-scaffold](https://github.com/africas-blockchain-club/abc-scaffold) by **Africa's Blockchain Club**

An implementation of **UUPS (Universal Upgradeable Proxy Standard)** upgradeable smart contracts built with Hardhat, OpenZeppelin Upgrades, and a React + Vite frontend.

---

## Overview

This project demonstrates deploying, upgrading, and interacting with an upgradeable smart contract using OpenZeppelin's `UUPSUpgradeable` and `OwnableUpgradeable`:

- **`MyContract` (V1)** — Initializes a `uint256 public value` and ownership via `initialize(uint256 initialValue)`, provides an owner-restricted `setValue(uint256 newValue)`, and restricts proxy upgrades to the contract owner via `_authorizeUpgrade`.
- **`MyContractV2` (V2)** — Inherits from `MyContract` while preserving storage layout and adds `incrementValue()` to increment `value` by `1`.

---

## Sepolia Testnet Deployment

| Contract | Address |
|----------|---------|
| **UUPS Proxy** | [`0xC5ABb714f5E0032b7360f31d5f35d289c4Cd4F8f`](https://sepolia.etherscan.io/address/0xC5ABb714f5E0032b7360f31d5f35d289c4Cd4F8f) |
| **MyContract (V1 Implementation)** | [`0x7CF5B55798397c1209afe6795f520Bb941FdB393`](https://sepolia.etherscan.io/address/0x7CF5B55798397c1209afe6795f520Bb941FdB393) |
| **MyContractV2 (V2 Implementation)** | [`0x4E2A31F4129f2b253CAB9a0F0d6A326785a9b75E`](https://sepolia.etherscan.io/address/0x4E2A31F4129f2b253CAB9a0F0d6A326785a9b75E) |

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | >= 18.0.0 |
| pnpm / npm | >= 9.0.0 |
| MetaMask | Latest |

---

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your values in `.env`:

- `SEPOLIA_RPC_URL` — Sepolia RPC endpoint (e.g. from [Infura](https://infura.io) or [Alchemy](https://alchemy.com))
- `PRIVATE_KEY` — Deployer wallet private key (**never commit `.env`**)
- `ETHERSCAN_API_KEY` — API key for contract verification on [Etherscan](https://etherscan.io)

### 3. Compile contracts

```bash
npx hardhat compile
```

### 4. Run tests

```bash
npx hardhat test
```

---

## Deploying, Upgrading & Interacting

### 1. Deploy V1 Proxy (`MyContract`)

Deploys the `MyContract` implementation and UUPS proxy initialized with `10`:

```bash
# Local network
npx hardhat run scripts/deploy.cjs --network localhost

# Sepolia testnet
npx hardhat run scripts/deploy.cjs --network sepolia
```

### 2. Upgrade Proxy to V2 (`MyContractV2`)

Upgrades the existing proxy at `PROXY_ADDRESS` in `scripts/upgrade.cjs` to `MyContractV2`:

```bash
npx hardhat run scripts/upgrade.cjs --network sepolia
```

### 3. Interact with the Upgraded Proxy

Calls `incrementValue()` on the proxy and logs the updated `value`:

```bash
npx hardhat run scripts/interact.cjs --network sepolia
```

---

## Frontend

Start the Vite + React development server:

```bash
cd frontend
pnpm install
pnpm run dev
# → http://localhost:5173
```

---

## Directory Structure

```text
upgradable/
├── .openzeppelin/
│   └── sepolia.json          # OpenZeppelin network manifest (proxy & implementation layouts)
├── contracts/
│   ├── MyContract.sol        # V1 UUPS upgradeable smart contract
│   └── MyContractV2.sol      # V2 upgraded implementation adding incrementValue()
├── scripts/
│   ├── deploy.cjs            # Deploys MyContract behind a UUPS proxy
│   ├── upgrade.cjs           # Upgrades the UUPS proxy to MyContractV2
│   └── interact.cjs          # Calls incrementValue() and reads state from the proxy
├── test/
│   └── MyContract.test.js    # Contract unit tests
├── frontend/                 # React + Vite frontend with MetaMask wallet connection
│   └── src/
│       ├── App.jsx
│       └── components/
│           └── Navbar.jsx
├── hardhat.config.js         # Hardhat configuration (Solidity 0.8.26, OpenZeppelin Upgrades)
├── .env.example              # Environment variable template
└── README.md
```

---

## Included Libraries

| Package | Use case |
|---------|----------|
| `@openzeppelin/contracts` | Standard smart contract building blocks |
| `@openzeppelin/contracts-upgradeable` | Upgradeable variants (`UUPSUpgradeable`, `OwnableUpgradeable`) |
| `@openzeppelin/hardhat-upgrades` | Hardhat plugin for deploying and upgrading proxies (`deployProxy`, `upgradeProxy`) |
| `@account-abstraction/contracts` | ERC-4337 interfaces and EntryPoint |
| `ethers` (v6) | Ethereum library for scripts, tests, and frontend |

---

## Verifying Contracts

```bash
npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
```

---

## Resources

- [OpenZeppelin Upgrades Plugins](https://docs.openzeppelin.com/upgrades-plugins/1.x/)
- [UUPS Proxies Guide](https://docs.openzeppelin.com/contracts/5.x/api/proxy#UUPSUpgradeable)
- [Hardhat Docs](https://hardhat.org/docs)
- [Solidity Docs](https://docs.soliditylang.org)
- [Ethers.js v6 Docs](https://docs.ethers.org/v6)

---

*Built with Africa's Blockchain Club — scaffold your next project with `npx abc-scaffold`.*
