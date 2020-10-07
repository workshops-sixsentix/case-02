pragma solidity ^0.6.2;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

contract DummySale is ERC721 {
    IERC20 _paymentToken;
    uint256 _nftPrice;

    uint256 _mintingsCount;

    constructor(
        string memory name,
        string memory symbol,
        IERC20 paymentToken,
        uint256 nftPrice
    ) public ERC721(name, symbol) {
        _paymentToken = paymentToken;
        _nftPrice = nftPrice;
        _setBaseURI("dummy uri");
    }

    function buy() public {
        require(
            balanceOf(msg.sender) == 0,
            "DummySale: NFT has been already minted"
        );

        require(
            _paymentToken.transferFrom(msg.sender, address(this), _nftPrice),
            "DummySale: Payment token transfer failed"
        );

        _mint(msg.sender, _mintingsCount);
        _setTokenURI(_mintingsCount, string(abi.encodePacked(msg.sender)));
        _mintingsCount++;
    }
}
