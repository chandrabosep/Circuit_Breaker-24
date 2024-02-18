// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {HelperConfig} from "./HelperConfig.s.sol";
import {SettlementGateway} from "../src/SettlementGateway.sol";

contract DeploySG is Script {
    address[] public tokenAddresses;
    address[] public priceFeedAddresses;

    function run() external returns (SettlementGateway, HelperConfig) {
        HelperConfig helperConfig = new HelperConfig();

        (address aavePool, address daiUsdPriceFeed, address dai, address daiIRS, uint256 deployerKey) =
            helperConfig.activeNetworkConfig();
        tokenAddresses = [dai];
        priceFeedAddresses = [daiUsdPriceFeed];

        console.log(block.chainid);
        vm.startBroadcast(deployerKey);
        SettlementGateway settlementGateway =
            new SettlementGateway(aavePool, tokenAddresses, priceFeedAddresses, daiIRS);
        vm.stopBroadcast();
        return (settlementGateway, helperConfig);
    }
}
