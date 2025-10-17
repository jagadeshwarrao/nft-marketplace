// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC2981 {
    function royaltyInfo(uint256 tokenId, uint256 salePrice) external view returns (address receiver, uint256 royaltyAmount);
}

contract NFTMarketplace is ReentrancyGuard, Ownable {
    using Address for address payable;

    struct Listing {
        address seller;
        address nftAddress;
        uint256 tokenId;
        uint256 price; // in wei
        bool active;
    }

    uint256 public listingCount;
    mapping(uint256 => Listing) public listings;

    event Listed(uint256 listingId, address indexed seller, address indexed nft, uint256 tokenId, uint256 price);
    event Cancelled(uint256 listingId);
    event Purchased(uint256 listingId, address buyer, uint256 price);

    /// @notice Seller must approve this contract for the token before listing.
    function listItem(address nftAddress, uint256 tokenId, uint256 price) external returns (uint256) {
        require(price > 0, "Price must be > 0");
        IERC721 nft = IERC721(nftAddress);
        require(nft.ownerOf(tokenId) == msg.sender, "Not owner");
        require(nft.getApproved(tokenId) == address(this) || nft.isApprovedForAll(msg.sender, address(this)), "Marketplace not approved");

        listingCount += 1;
        listings[listingCount] = Listing({
            seller: msg.sender,
            nftAddress: nftAddress,
            tokenId: tokenId,
            price: price,
            active: true
        });

        emit Listed(listingCount, msg.sender, nftAddress, tokenId, price);
        return listingCount;
    }

    function cancelListing(uint256 listingId) external {
        Listing storage l = listings[listingId];
        require(l.active, "Not active");
        require(l.seller == msg.sender || owner() == msg.sender, "Not seller or admin");
        l.active = false;
        emit Cancelled(listingId);
    }

    /// @notice Purchase a listed NFT. Pays royalty via ERC-2981 if the NFT supports it.
    function buy(uint256 listingId) external payable nonReentrant {
        Listing storage l = listings[listingId];
        require(l.active, "Listing not active");
        require(msg.value == l.price, "Incorrect payment");

        l.active = false;

        // Handle royalties if NFT implements ERC-2981
        uint256 salePrice = msg.value;
        uint256 royaltyAmount = 0;
        address royaltyReceiver = address(0);

        // try-catch so that marketplace works even if NFT doesn't implement royalty
        try IERC2981(l.nftAddress).royaltyInfo(l.tokenId, salePrice) returns (address receiver, uint256 amount) {
            royaltyReceiver = receiver;
            royaltyAmount = amount;
        } catch {
            // no-op
        }

        // Transfer funds: first royalty, then remainder to seller
        if (royaltyAmount > 0 && royaltyReceiver != address(0)) {
            payable(royaltyReceiver).sendValue(royaltyAmount);
        }

        uint256 sellerAmount = salePrice - royaltyAmount;
        payable(l.seller).sendValue(sellerAmount);

        // Transfer NFT to buyer
        IERC721(l.nftAddress).safeTransferFrom(l.seller, msg.sender, l.tokenId);

        emit Purchased(listingId, msg.sender, salePrice);
    }

    // Owner functions, emergency withdraw etc. (optional)
    receive() external payable {}
}
