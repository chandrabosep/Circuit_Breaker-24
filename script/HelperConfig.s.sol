// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {Script} from "forge-std/Script.sol";

contract HelperConfig is Script {
    NetworkConfig public activeNetworkConfig;
    uint8 public constant DECIMALS = 8;
    int256 public constant DAI_USD_PRICE = 1e8;

    struct NetworkConfig {
        address aavePool;
        address daiUsdPriceFeed;
        address dai;
        address daiIRS;
        uint256 deployerKey;
    }

    constructor() {
        if (block.chainid == 534351) {
            activeNetworkConfig = getSepoliaEthConfig();
        }
    }

    function getSepoliaEthConfig() public view returns (NetworkConfig memory sepoliaNetworkConfig) {
        sepoliaNetworkConfig = NetworkConfig({
            aavePool: 0x48914C788295b5db23aF2b5F0B3BE775C4eA9440,
            daiUsdPriceFeed: 0x9388954B816B2030B003c81A779316394b3f3f11,
            dai: 0x7984E363c38b590bB4CA35aEd5133Ef2c6619C40, // decimal is 18
            daiIRS: 0x85AD5a4a0974b6092d1F7369eC39c8b2255b8e6f,
            deployerKey: vm.envUint("PRIVATE_KEY")
        });
    }
}
