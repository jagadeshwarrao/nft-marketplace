import { ethers } from "ethers";
import MyNFTABI from "./abis/MyNFT.json"; // compile and copy ABI

export async function mintNFT(tokenURI, royaltyReceiver, feeNumerator) {
  if (!window.ethereum) throw new Error("Wallet not connected");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const nftAddress = process.env.REACT_APP_MYNFT_ADDRESS; // set env
  const nft = new ethers.Contract(nftAddress, MyNFTABI, signer);

  // payable? our mint isn't payable. This returns a tx
  const tx = await nft.mint(await signer.getAddress(), tokenURI, royaltyReceiver, feeNumerator);
  const receipt = await tx.wait();
  return receipt;
}
