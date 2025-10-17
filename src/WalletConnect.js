import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect() {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const p = new ethers.BrowserProvider(window.ethereum);
      setProvider(p);
    }
  }, []);

  async function connectWallet() {
    if (!window.ethereum) throw new Error("No wallet");
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  }

  return (
    <div>
      {account ? <div>Connected: {account}</div> : <button onClick={connectWallet}>Connect Wallet</button>}
    </div>
  );
}
