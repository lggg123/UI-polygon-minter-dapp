import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { ethers } from 'ethers';

interface NFTMinterFormProps {
  mintNFT: (contractAddress: string, metaDataUrl: string) => void;
}

const NFTMinterForm: React.FC<NFTMinterFormProps> = ({ mintNFT }) => {
  const [contractAddress, setContractAddress] = useState('');
  const [metaDataUrl, setMetaDataUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    try {
      setIsLoading(true);

      // Validate inputs
      if (!contractAddress || !metaDataUrl) {
        // Handle validation error, show a message, or prevent minting
        return;
      }

      // Call your mintNFT function using ethers.js
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ['YourContractABI'], signer);

      // Perform the minting transaction
      const tx = await contract.mintNFT(signer.getAddress(), metaDataUrl);
      await tx.wait();

      // Trigger the parent component's mintNFT function if needed
      mintNFT(contractAddress, metaDataUrl);

      // Reset form values
      setContractAddress('');
      setMetaDataUrl('');
    } catch (error) {
      console.error('Error minting NFT:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form style={{ color: 'white', backgroundColor: 'black', padding: '20px', borderRadius: '8px' }}>
      <Form.Group controlId="contractAddress">
        <Form.Label style={{ marginBottom: '8px' }}>Contract Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="metaDataUrl" style={{ marginBottom: '16px' }}>
        <Form.Label>IPFS URL for Metadata</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter IPFS URL"
          value={metaDataUrl}
          onChange={(e) => setMetaDataUrl(e.target.value)}
        />
      </Form.Group>

      <Button
        disabled={!contractAddress || !metaDataUrl || isLoading}
        style={{
          backgroundColor: '#6f42c1',
          borderColor: '#6f42c1',
          borderRadius: '4px',
          padding: '10px 20px',
          fontSize: '16px',
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease',
        }}
        variant="primary"
        onClick={handleMint}
      >
        {isLoading ? 'Minting...' : 'Mint NFT'}
      </Button>
    </Form>
  );
};

export default NFTMinterForm;
