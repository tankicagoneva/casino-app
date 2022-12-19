import React from 'react';
import { Container } from 'react-bootstrap';
import CasinoInteractionCard from './CasinoInteractionCard';
import ConnectWalletModal from '../../components/ConnectWalletModal';
import LastThreeWinnersCard from '../../components/LastThreeWinnersCard';
import useWalletConnectionModal from '../../hooks/useWalletConnectionModal';


const Home = () => {
  const { isWalletConnectModalOpen } = useWalletConnectionModal();
  return (
    <Container className="mt-5">
      {isWalletConnectModalOpen && <ConnectWalletModal />}
      <CasinoInteractionCard />
      <LastThreeWinnersCard />
    </Container>
  );
};

export default Home;
