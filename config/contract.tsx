export const contractAddress = "0x09c7d95e266ef661416632610cfe77C3AED28892";

export const contractABI = [
  {
    inputs: [
      { internalType: "address", name: "aavePool", type: "address" },
      { internalType: "address[]", name: "tokenAddresses", type: "address[]" },
      {
        internalType: "address[]",
        name: "priceFeedAddresses",
        type: "address[]",
      },
      { internalType: "address", name: "daiIRS", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [],
    name: "SettlementGateway__InsufficientCollateral",
    type: "error",
  },
  { inputs: [], name: "SettlementGateway__NeedsMoreThanZero", type: "error" },
  {
    inputs: [],
    name: "SettlementGateway__TokenAddressesAndPriceFeedAddressesAmountsDontMatch",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SettlementGateway__TokenNotAllowed",
    type: "error",
  },
  { inputs: [], name: "SettlementGateway__TransferFailed", type: "error" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "Supplied",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "id", type: "uint256" },
      {
        indexed: false,
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
    ],
    name: "TokenDeposited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "WithdraToken",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [
      { internalType: "uint256", name: "depositAmountWei", type: "uint256" },
      { internalType: "uint256", name: "depositPeriodDays", type: "uint256" },
    ],
    name: "calculateDepositInterest",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "amountCollateral", type: "uint256" },
      { internalType: "uint256", name: "depositPeriodDays", type: "uint256" },
    ],
    name: "depositAndSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "amountCollateral", type: "uint256" },
      { internalType: "uint256", name: "depositPeriodDays", type: "uint256" },
    ],
    name: "depositCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getAccountInformation",
    outputs: [
      { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
      { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
      {
        internalType: "uint256",
        name: "availableBorrowsBase",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentLiquidationThreshold",
        type: "uint256",
      },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      { internalType: "uint256", name: "healthFactor", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "getCollateralTokenPriceFeed",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollateralTokens",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDAITokenCurrentAPR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getDaiInterestRateStrategy",
    outputs: [
      {
        internalType: "uint256",
        name: "daiVariableInterestRate",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getDepositId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "depositId", type: "uint256" },
    ],
    name: "getDepositPeriodForUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "depositAmountWei", type: "uint256" },
      { internalType: "uint256", name: "depositPeriodDays", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "getInterestAndTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolAddress",
    outputs: [{ internalType: "contract IPool", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "tokenCollateral", type: "address" },
    ],
    name: "getTokenDeposited",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "tokenCollateral", type: "address" },
    ],
    name: "getTransferInterest",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "depositId", type: "uint256" },
    ],
    name: "getUserDepositInfo",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "depositId", type: "uint256" },
          {
            internalType: "address",
            name: "tokenCollateralAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountCollateral",
            type: "uint256",
          },
          { internalType: "uint256", name: "depositPeriod", type: "uint256" },
        ],
        internalType: "struct SettlementGateway.UserDeposit",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "tokenCollateral", type: "address" },
    ],
    name: "getUserSuppliedCollateralAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "tokenCollateral", type: "address" },
    ],
    name: "getWithdrawCollateral",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "amountCollateral", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "sendToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "supplyCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "amountCollateral", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "transferInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "amountCollateral", type: "uint256" },
    ],
    name: "withdrawBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenCollateralAddress",
        type: "address",
      },
      { internalType: "uint256", name: "collateralAmount", type: "uint256" },
    ],
    name: "withdrawCollateral",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
