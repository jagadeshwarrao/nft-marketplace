async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with", deployer.address);

  const MyNFT = await ethers.getContractFactory("MyNFT");
  const nft = await MyNFT.deploy("MyNFT", "MNFT");
  await nft.deployed();
  console.log("MyNFT:", nft.address);

  const Marketplace = await ethers.getContractFactory("NFTMarketplace");
  const market = await Marketplace.deploy();
  await market.deployed();
  console.log("Marketplace:", market.address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
