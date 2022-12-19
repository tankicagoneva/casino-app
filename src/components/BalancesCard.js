import React, { useEffect } from 'react';
import Text from './Text';
import Card from './Card';
import { colors } from '../theme';
import { useWeb3React } from '@web3-react/core';
import useEth from '../hooks/useEth';
import { useCasino } from '../hooks/useCasino';
import { useAppContext } from '../AppContext';

const BalanceCard = () => {
  const { account } = useWeb3React();
  const { fetchEthBalance, ethBalance } = useEth();
  const { fetchCasinoBalance, getCurrentBetAmount, casinoBalance, currentBetAmount } = useCasino();

 useEffect(async () => {
   if (account) {
     await fetchEthBalance();
     await fetchCasinoBalance();
     await getCurrentBetAmount();
   }
 }, [account]);

  return (
    <Card style={{ maxWidth: 300 }}>
      <Text block color={colors.green}>
        ETH balance: {ethBalance}
      </Text>
      <Text block color={colors.green}>
        Casino balance: {casinoBalance}
      </Text>
      <Text block color={colors.green}>
        Current Bet amount: {currentBetAmount}
      </Text>
    </Card>
  );
};

export default BalanceCard;
