import { useContract } from './useContract';
import CASINO_ABI from '../static/casinoABI';
import useIsValidNetwork from './useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import { formatUnits, parseEther, formatEther } from '@ethersproject/units';
import { useEffect } from 'react';
import useEth from './useEth';

export const useCasino = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const CasinoContractAddress = '0xc28bAfAcBA48D4913C30c3Ce171f14fb86d3b3FC'; // ropsten
  const CasinoContract = useContract(CasinoContractAddress, CASINO_ABI);

  const {
    setCasinoBalance,
    setCurrentBetAmount,
    setTxnStatus,
    setCasinoNumber,
    setBetStatus,
    setWinnerOne,
    setWinnerTwo,
    setWinnerThree,
    casinoBalance,
    currentBetAmount,
    casinoNumber,
    betStatus,
    winnerOne,
    winnerTwo,
    winnerThree,
  } = useAppContext();
  const { fetchEthBalance } = useEth();

  const fetchCasinoBalance = async () => {
    const casinoBalance = await CasinoContract.getCasinoBalance();
    setCasinoBalance(parseFloat(formatEther(casinoBalance)).toPrecision(4));
  };

  const getCurrentBetAmount = async () => {
    const currentBetAmount = await CasinoContract.gameWeiValues(account);
    setCurrentBetAmount(parseFloat(formatEther(currentBetAmount)).toPrecision(4));
  };

  const checkOddOrEven = (result) => {
    setCasinoNumber(result);

    // This gives us the last digit from the random number, we need to calculate it like this
    // beacause the number is too big and can't be calculated inside JavaScript
    const lastDigit = result.charAt(result.length - 1);

    if (Number(lastDigit) % 2 == 0) {
      setBetStatus('WON');
    } else {
      setBetStatus('LOST');
    }
  };

  const fetchWinner = async (id) => {
    const winner = await CasinoContract.lastThreeWinners(id);

    if (id == 0) {
      setWinnerOne(winner);
    } else if (id == 1) {
      setWinnerTwo(winner);
    } else {
      setWinnerThree(winner);
    }
  };

  const playGame = async (amount) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus('LOADING');
        const txn = await CasinoContract.playGame({
          from: account,
          value: parseEther(amount),
        });
        await txn.wait(1);
        await fetchCasinoBalance();
        await getCurrentBetAmount();
        await fetchEthBalance();
        setTxnStatus('COMPLETE');
        setBetStatus('--');
      } catch (error) {
        setTxnStatus('ERROR');
      }
    }
  };

  const checkResult = async () => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus('LOADING');
        const txn = await CasinoContract.playGame({
          from: account,
        });
        CasinoContract.on('BetFinished', async (sender, randomNumber, amount) => {
          // The random number emited from the event is in hexadecimal format, to convert it to big number we must use toString
          checkOddOrEven(randomNumber.toString());
          await txn.wait(1);
          await fetchCasinoBalance();
          await getCurrentBetAmount();
          await fetchEthBalance();
          await fetchWinner(0);
          await fetchWinner(1);
          await fetchWinner(2);
          setTxnStatus('COMPLETE');
        });
      } catch (error) {
        setTxnStatus('ERROR');
      }
    }
  };

useEffect(() => {
    if (account) {
      getCurrentBetAmount();
    }
  }, [account]);

  return {
    casinoBalance,
    currentBetAmount,
    getCurrentBetAmount,
    fetchCasinoBalance,
    playGame,
    checkResult,
    fetchWinner,
    winnerOne,
    winnerTwo,
    winnerThree,
    betStatus,
    casinoNumber,
  };
};
