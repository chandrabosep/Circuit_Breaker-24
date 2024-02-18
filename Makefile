-include .env

ifeq ($(findstring --network scrollSepolia,$(ARGS)),--network scrollSepolia)
	NETWORK_ARGS := --rpc-url $(SCROLLSEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(SCROLLSCAN_API_KEY) -vvvv
endif

deploy-SettlementGateway:
	@forge script script/DeploySG.s.sol:DeploySG $(NETWORK_ARGS) 
 