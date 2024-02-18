//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IERC20} from "aave-v3-core/contracts/dependencies/openzeppelin/contracts/IERC20.sol";
import {IPool} from "aave-v3-core/contracts/interfaces/IPool.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IDefaultInterestRateStrategy} from "aave-v3-core/contracts/interfaces/IDefaultInterestRateStrategy.sol";

contract SettlementGateway is ReentrancyGuard {
    ////////////
    // Errors //
    ////////////

    error SettlementGateway__TransferFailed();
    error SettlementGateway__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
    error SettlementGateway__NeedsMoreThanZero();
    error SettlementGateway__TokenNotAllowed(address token);
    error SettlementGateway__InsufficientCollateral();

    ///////////
    // Types //
    ///////////

    /////////////////////
    // State Variables //
    /////////////////////

    IPool private immutable i_aavePool;
    IDefaultInterestRateStrategy private immutable i_daiIRS;
    uint256 private constant DAYS_IN_YEAR = 365;
    uint256 private constant DAI_CURRENT_APR = 2000000000000000; // In WEI

    struct UserDeposit {
        uint256 depositId;
        address tokenCollateralAddress;
        uint256 amountCollateral;
        uint256 depositPeriod;
    }

    /// @dev Mapping of token address to price feed address
    mapping(address collateralToken => address priceFeed) private s_priceFeeds;
    /// @dev Amount of withdraw by user
    mapping(address user => mapping(address withdrawToken => uint256 amount)) private s_userWithdrawCollateral;
    /// @dev Amount of deposited by user
    mapping(address user => mapping(address depositToken => uint256 amount)) private s_userTokenDeposits;
    /// @dev Amount of transfer Interest by user
    mapping(address user => mapping(address transferInterestToken => uint256 amount)) private s_userTransferInterest;
    /// @dev Amount of supplied by user
    mapping(address user => mapping(address tokenCollateral => uint256 amount)) private s_userSuppliedCollateral;
    /// @dev Mapping to store user deposit Period with respect to deposit Id
    mapping(address user => mapping(uint256 depositId => uint256 depositPeriod)) private s_userDepositIdToDepositPeriod;
    /// @dev Mapping from user address to depositId to UserDeposit struct
    mapping(address user => mapping(uint256 depositId => UserDeposit)) private s_userDeposits;
    /// @dev Mapping keeps track of the sequence of deposit IDs for each user, facilitating the generation of unique deposit IDs
    mapping(address user => uint256 nextDepositId) private s_userToDepositId;
    /// @dev If we know exactly how many tokens we have, we could make this immutable
    address[] private s_collateralTokens;

    ////////////
    // Events //
    ////////////

    event TokenDeposited(
        address indexed user, address indexed token, uint256 indexed amount, uint256 id, uint256 period
    );
    event Supplied(address indexed user, uint256 amount, address indexed token);
    event WithdraToken(address indexed user, address indexed token, uint256 indexed amount);
    event Withdrawn(address indexed user, address indexed token, uint256 indexed amount);

    ///////////////
    // Modifiers //
    ///////////////

    modifier moreThanZero(uint256 amount) {
        if (amount == 0) {
            revert SettlementGateway__NeedsMoreThanZero();
        }
        _;
    }

    modifier isAllowedToken(address token) {
        if (s_priceFeeds[token] == address(0)) {
            revert SettlementGateway__TokenNotAllowed(token);
        }
        _;
    }

    ///////////////
    // Functions //
    ///////////////

    constructor(
        address aavePool,
        address[] memory tokenAddresses,
        address[] memory priceFeedAddresses,
        address daiIRS
    ) {
        if (tokenAddresses.length != priceFeedAddresses.length) {
            revert SettlementGateway__TokenAddressesAndPriceFeedAddressesAmountsDontMatch();
        }
        // These feeds will be the USD pairs
        // For example ETH / USD or DAI / USD or USDC / USD or USDT / USD
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            s_priceFeeds[tokenAddresses[i]] = priceFeedAddresses[i];
            s_collateralTokens.push(tokenAddresses[i]);
        }
        i_aavePool = IPool(aavePool);
        i_daiIRS = IDefaultInterestRateStrategy(daiIRS);
    }
    /////////////////////////////////
    // External / Public Functions //
    /////////////////////////////////

    ///////////////////////////
    // Aave Pool Interaction //
    ///////////////////////////

    function depositAndSupply(
        address tokenCollateralAddress, // DAI Token address on scroll sepolia testnet
        uint256 amountCollateral, // In WEI, decimal 18
        uint256 depositPeriodDays // In Day, for calculating DAI Interest
    ) public {
        depositCollateral(tokenCollateralAddress, amountCollateral, depositPeriodDays);
        supplyCollateral(tokenCollateralAddress, amountCollateral);
    }

    /**
     * @notice Facilitates the deposit of collateral by a user into the contract.
     * @dev This function allows a user to deposit a specified amount of collateral for a defined deposit period.
     * @param tokenCollateralAddress The address of the collateral token to be deposited.
     * @param amountCollateral The amount of collateral to be deposited, in WEI.
     * @param depositPeriodDays The duration of the deposit period in days.
     * @dev The function performs various tasks, including updating user-specific deposit records, transferring collateral from the user,
     * and emitting an event to signal the successful deposit.
     * @dev The function also incorporates modifiers, ensuring the amount of collateral is greater than zero and that the collateral token is allowed.
     */
    function depositCollateral(
        address tokenCollateralAddress,
        uint256 amountCollateral, // In WEI
        uint256 depositPeriodDays // In Day
    ) public moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) {
        uint256 currentDepositId = s_userToDepositId[msg.sender] == 0 ? 1 : s_userToDepositId[msg.sender];

        s_userTokenDeposits[msg.sender][tokenCollateralAddress] += amountCollateral;
        s_userDepositIdToDepositPeriod[msg.sender][currentDepositId] = depositPeriodDays;
        s_userDeposits[msg.sender][currentDepositId] = UserDeposit({
            depositId: currentDepositId,
            tokenCollateralAddress: tokenCollateralAddress,
            amountCollateral: amountCollateral,
            depositPeriod: depositPeriodDays
        });

        // Call the approve function for the user through the front end
        bool success = IERC20(tokenCollateralAddress).transferFrom(msg.sender, address(this), amountCollateral);
        if (!success) {
            revert SettlementGateway__TransferFailed();
        }
        s_userToDepositId[msg.sender] = currentDepositId + 1;

        emit TokenDeposited(msg.sender, tokenCollateralAddress, amountCollateral, currentDepositId, depositPeriodDays);
    }

    /**
     * @notice Allows a user to supply additional collateral to the Aave lending pool.
     * @dev This function can only be called if the supplied collateral amount is greater than zero and the token is allowed for collateral.
     * @param tokenCollateralAddress Address of the collateral token to be supplied.
     * @param collateralAmount Amount of collateral to be supplied, in Wei.
     * @dev Emits a Supplied event with details of the user's address, supplied collateral amount, and collateral token.
     * @dev Throws a SettlementGateway__InsufficientCollateral error if the user has insufficient collateral for the specified token.
     * @dev Approves the Aave lending pool to spend the collateral on behalf of the user and then calls the Aave supply function.
     * @dev Increases the user's supplied collateral balance for the specified token.
     */
    function supplyCollateral(
        address tokenCollateralAddress,
        uint256 collateralAmount // In WEI
    ) public moreThanZero(collateralAmount) isAllowedToken(tokenCollateralAddress) {
        if (s_userTokenDeposits[msg.sender][tokenCollateralAddress] < collateralAmount) {
            revert SettlementGateway__InsufficientCollateral();
        }
        IERC20(tokenCollateralAddress).approve(address(i_aavePool), collateralAmount);
        i_aavePool.supply(tokenCollateralAddress, collateralAmount, address(this), 0);
        s_userSuppliedCollateral[msg.sender][tokenCollateralAddress] += collateralAmount;
        emit Supplied(msg.sender, collateralAmount, tokenCollateralAddress);
    }

    function withdrawCollateral(address tokenCollateralAddress, uint256 collateralAmount)
        public
        moreThanZero(collateralAmount)
        isAllowedToken(tokenCollateralAddress)
    {
        i_aavePool.withdraw(tokenCollateralAddress, collateralAmount, address(this));
        s_userSuppliedCollateral[msg.sender][tokenCollateralAddress] - collateralAmount;
        emit Withdrawn(msg.sender, tokenCollateralAddress, collateralAmount);
    }

    function sendToken(address tokenCollateralAddress, uint256 amountCollateral, address to)
        public
        moreThanZero(amountCollateral)
        isAllowedToken(tokenCollateralAddress)
    {
        if (s_userTokenDeposits[msg.sender][tokenCollateralAddress] < amountCollateral) {
            revert SettlementGateway__InsufficientCollateral();
        }

        bool success = IERC20(tokenCollateralAddress).transfer(to, amountCollateral);
        if (!success) {
            revert SettlementGateway__TransferFailed();
        }

        s_userTokenDeposits[msg.sender][tokenCollateralAddress] -= amountCollateral;
    }

    /**
     * @notice Allows the user to withdraw a specified amount of deposited tokens.
     * @param tokenCollateralAddress The address of the deposited token.
     * @param amountCollateral The amount, in WEI, to be withdrawn.
     * @dev The user must have sufficient deposited tokens to cover the withdrawal.
     * @dev Emits a 'WithdraToken' event for tracking purposes.
     * @dev Transfers the specified amount of tokens to the user.
     * @dev If the transfer fails, reverts the transaction with 'TransferFailed' error.
     */
    function withdrawBalance(
        address tokenCollateralAddress,
        uint256 amountCollateral // In WEI
    ) public moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) nonReentrant {
        if (s_userTokenDeposits[msg.sender][tokenCollateralAddress] < amountCollateral) {
            revert SettlementGateway__InsufficientCollateral();
        }

        bool success = IERC20(tokenCollateralAddress).transfer(msg.sender, amountCollateral);
        if (!success) {
            revert SettlementGateway__TransferFailed();
        }
        s_userTokenDeposits[msg.sender][tokenCollateralAddress] -= amountCollateral;
        s_userWithdrawCollateral[msg.sender][tokenCollateralAddress] += amountCollateral;

        emit WithdraToken(msg.sender, tokenCollateralAddress, amountCollateral);
    }

    function getInterestAndTransfer(
        address tokenCollateralAddress,
        uint256 depositAmountWei,
        uint256 depositPeriodDays,
        address to
    ) public {
        (uint256 interest) = calculateDepositInterest(depositAmountWei, depositPeriodDays);
        transferInterest(tokenCollateralAddress, interest, to);
    }

    function transferInterest(
        address tokenCollateralAddress,
        uint256 amountCollateral, // In WEI
        address to
    ) public moreThanZero(amountCollateral) isAllowedToken(tokenCollateralAddress) {
        if (s_userTokenDeposits[msg.sender][tokenCollateralAddress] < amountCollateral) {
            revert SettlementGateway__InsufficientCollateral();
        }

        bool success = IERC20(tokenCollateralAddress).transfer(to, amountCollateral);
        if (!success) {
            revert SettlementGateway__TransferFailed();
        }
        s_userTokenDeposits[msg.sender][tokenCollateralAddress] -= amountCollateral;
        s_userTransferInterest[msg.sender][tokenCollateralAddress] += amountCollateral;

        emit WithdraToken(msg.sender, tokenCollateralAddress, amountCollateral);
    }

    //////////////////////////////////////////////
    // External & Public View & Pure Functions  //
    //////////////////////////////////////////////

    /* Calculate Functions **/

    /**
     * @notice Calculates the interest earned on a deposit based on the deposit token type, amount, and period.
     * @dev The interest calculation depends on the deposit token type, and the formula considers a predefined ratio (numerator/denominator).
     * @param depositAmountWei The amount of deposit in WEI.
     * @param depositPeriodDays The duration of the deposit period in days.
     * @return depositInterest The calculated interest on the deposit in WEI.
     */
    function calculateDepositInterest(uint256 depositAmountWei, uint256 depositPeriodDays)
        public
        view
        returns (uint256)
    {
        uint256 numerator = getDaiInterestRateStrategy(); // 0.002(0.2%)
        uint256 denominator = 100000000;

        uint256 variableInterestRateInWei = numerator / denominator;
        uint256 depositInterest = (depositAmountWei * variableInterestRateInWei) / 1e18;
        uint256 totalDepositInterest = (depositInterest * depositPeriodDays) / DAYS_IN_YEAR;
        return totalDepositInterest;
    }

    /* Get Information Functions **/

    /**
     * @notice Retrieves the account information of a user from the Aave pool.
     * @param user The address of the user whose account information is being requested.
     * @return totalCollateralBase The total collateral of the user in the base currency.
     * @return totalDebtBase The total debt of the user in the base currency.
     * @return availableBorrowsBase The available borrow amount for the user in the base currency.
     * @return currentLiquidationThreshold The current liquidation threshold for the user's account.
     * @return ltv The loan-to-value ratio of the user's account.
     * @return healthFactor The health factor of the user's account.
     */
    function getAccountInformation(address user)
        external
        view
        returns (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        )
    {
        (totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor) =
            i_aavePool.getUserAccountData(user);
        return
            (totalCollateralBase, totalDebtBase, availableBorrowsBase, currentLiquidationThreshold, ltv, healthFactor);
    }

    ////////////////////////////////////////
    // Getter Public / External Functions //
    ////////////////////////////////////////

    function getPoolAddress() external view returns (IPool) {
        return i_aavePool;
    }

    function getCollateralTokenPriceFeed(address token) external view returns (address) {
        return s_priceFeeds[token];
    }

    function getCollateralTokens() external view returns (address[] memory) {
        return s_collateralTokens;
    }

    function getUserSuppliedCollateralAmount(address user, address tokenCollateral) external view returns (uint256) {
        return s_userSuppliedCollateral[user][tokenCollateral]; // In WEI
    }

    function getDepositPeriodForUser(address user, uint256 depositId) external view returns (uint256) {
        return s_userDeposits[user][depositId].depositPeriod; // In Day
    }

    function getUserDepositInfo(address user, uint256 depositId) external view returns (UserDeposit memory) {
        return s_userDeposits[user][depositId];
    }

    function getDAITokenCurrentAPR() external pure returns (uint256) {
        return DAI_CURRENT_APR; // In WEI
    }

    function getDepositId(address user) external view returns (uint256) {
        return s_userToDepositId[user];
    }

    function getDaiInterestRateStrategy() public view returns (uint256 daiVariableInterestRate) {
        daiVariableInterestRate = i_daiIRS.OPTIMAL_STABLE_TO_TOTAL_DEBT_RATIO();
        return daiVariableInterestRate;
    }

    function getWithdrawCollateral(address user, address tokenCollateral) public view returns (uint256) {
        return s_userWithdrawCollateral[user][tokenCollateral];
    }

    function getTransferInterest(address user, address tokenCollateral) public view returns (uint256) {
        return s_userTransferInterest[user][tokenCollateral];
    }

    function getTokenDeposited(address user, address tokenCollateral) public view returns (uint256) {
        return s_userTokenDeposits[user][tokenCollateral];
    }
}
