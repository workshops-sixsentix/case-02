pragma solidity ^0.6.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract DummyToken is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint256 supply,
        address beneficiary
    ) public ERC20(name, symbol) {
        _mint(beneficiary, supply);
    }
}
