import { ethers } from "ethers";
import MarketplaceABI from "./abis/NFTMarketplace.json";

export async function buyListing(listingId, price) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const marketAddress = process.env.REACT_APP_MARKET_ADDRESS;
  const market = new ethers.Contract(marketAddress, MarketplaceABI, signer);

  const tx = await market.buy(listingId, { value: price });
  return tx.wait();
}
