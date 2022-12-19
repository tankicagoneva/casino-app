import React, { useEffect } from 'react';
import styled from 'styled-components';
import Text from '../components/Text';
import Card from '../components/Card';
import { colors } from '../theme';
import { useCasino } from '../hooks/useCasino';
import { useWeb3React } from '@web3-react/core';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 30px;
  margin-bottom: 30px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
`;

const LastThreeWinnersCard = () => {
  const { account } = useWeb3React();
  const { fetchWinner, winnerOne, winnerTwo, winnerThree } = useCasino();

  useEffect(async () => {
    if (account) {
      await fetchWinner(0);
      await fetchWinner(1);
      await fetchWinner(2);
    }
  }, [account]);

  return (
    <Container show>
      <Card style={{ maxWidth: 420, minHeight: 185 }}>
        <Text block color={colors.green} className="mb-3">
          Winner 1: {winnerOne}
        </Text>
        <Text block color={colors.green} className="mb-3">
          Winner 2: {winnerTwo}
        </Text>
        <Text block color={colors.green} className="mb-3">
          Winner 3: {winnerThree}
        </Text>
      </Card>
    </Container>
  );
};

export default LastThreeWinnersCard;
