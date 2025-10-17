// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract MyNFT is ERC721URIStorage, Ownable, ERC2981 {
    uint256 private _tokenIds;

    constructor() ERC721("MyNFTCollection", "MNFT") {
        // Set default royalty (e.g., 5%)
        _setDefaultRoyalty(msg.sender, 500);
    }

    function mintNFT(address recipient, string memory tokenURI)
        external
        onlyOwner
        returns (uint256)
    {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }

    // This fixes your override issue 👇
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
