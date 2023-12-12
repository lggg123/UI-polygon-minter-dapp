import React from 'react';
import './App.css';
import NFTMinterForm from './NFTMinterForm';

const App: React.FC = () => {
  const mintNFT = (contractAddress: string, metaDataUrl: string) => {
    // Call the function to mint NFT using contractAddress and metaDataUrl
    console.log(`Minting NFT with Contract Address: ${contractAddress} and IPFS URL: ${metaDataUrl}`);

  };

  const gradientStyle = {
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={gradientStyle} className="App">
      <header>
        <h1>Polygon NFT Minter</h1>
        <NFTMinterForm mintNFT={mintNFT} />
      </header>
    </div>
  )
}

export default App;
