const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Marketplace", function () {
  let nft, market, owner, seller, buyer;

  beforeEach(async () => {
    [owner, seller, buyer] = await ethers.getSigners();

    const MyNFT = await ethers.getContractFactory("MyNFT");
    nft = await MyNFT.deploy("Test", "TST");
    await nft.deployed();

    const Market = await ethers.getContractFactory("NFTMarketplace");
    market = await Market.deploy();
    await market.deployed();
  });

  it("should mint and list NFT and allow purchase with royalty payment", async () => {
    // mint to seller with royalty 500 = 5%
    await nft.connect(seller).mint(await seller.getAddress(), "ipfs://Qm...", await seller.getAddress(), 500);

    const tokenId = 1;
    await nft.connect(seller).approve(market.address, tokenId);
    const price = ethers.parseEther("0.1");
    await market.connect(seller).listItem(nft.address, tokenId, price);

    // buyer buys listing 1
    await expect(market.connect(buyer).buy(1, { value: price })).to.changeEtherBalances(
      [buyer, seller], // note: royalty receiver is seller here, so seller will get price - royalty + royalty, check balances accordingly
      [price * -1n, price] // (example) adjust for royalty in real asserts
    );
  });
});
