import React, { createContext, useReducer } from 'react';

const initialContext = {
  ethBalance: '--',
  setEthBalance: () => {},
  
  casinoBalance: '--',
  setCasinoBalance: () => {},

  currentBetAmount: '--',
  setCurrentBetAmount: () => {},

  casinoNumber: '--',
  setCasinoNumber: () => {},

  betStatus: '--',
  setBetStatus: () => {},

  winnerOne: '--',
  setWinnerOne: () => {},

  winnerTwo: '--',
  setWinnerTwo: () => {},

  winnerThree: '--',
  setWinnerThree: () => {},

  isWalletConnectionModalOpen: false,
  setWalletConnectModal: () => {},
  txnStatus: 'NOT_SUBMITTED',
  setTxnStatus: () => {},
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_ETH_BALANCE':
      return {
        ...state,
        ethBalance: payload,
      };

    case 'SET_CASINO_BALANCE':
      return {
        ...state,
        casinoBalance: payload,
      };

    case 'SET_CURRENT_BET_AMOUNT':
      return {
        ...state,
        currentBetAmount: payload,
      };

    case 'SET_CASINO_NUMBER':
      return {
        ...state,
        casinoNumber: payload,
      };

    case 'SET_BET_STATUS':
      return {
        ...state,
        betStatus: payload,
      };

    case 'SET_WINNER_ONE':
      return {
        ...state,
        winnerOne: payload,
      };

    case 'SET_WINNER_TWO':
      return {
        ...state,
        winnerTwo: payload,
      };

    case 'SET_WINNER_THREE':
      return {
        ...state,
        winnerThree: payload,
      };

    case 'SET_WALLET_MODAL':
      return {
        ...state,
        isWalletConnectModalOpen: payload,
      };

    case 'SET_TXN_STATUS':
      return {
        ...state,
        txnStatus: payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext(initialContext);
export const useAppContext = () => React.useContext(AppContext);
export const AppContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(appReducer, initialContext);

  const contextValue = {
    ethBalance: store.ethBalance,
    setEthBalance: (balance) => {
      dispatch({ type: 'SET_ETH_BALANCE', payload: balance });
    },
    casinoBalance: store.casinoBalance,
    setCasinoBalance: (balance) => {
      dispatch({ type: 'SET_CASINO_BALANCE', payload: balance });
    },
    currentBetAmount: store.currentBetAmount,
    setCurrentBetAmount: (balance) => {
      dispatch({ type: 'SET_CURRENT_BET_AMOUNT', payload: balance });
    },
    casinoNumber: store.casinoNumber,
    setCasinoNumber: (number) => {
      dispatch({ type: 'SET_CASINO_NUMBER', payload: number });
    },
    betStatus: store.betStatus,
    setBetStatus: (status) => {
      dispatch({ type: 'SET_BET_STATUS', payload: status });
    },
    winnerOne: store.winnerOne,
    setWinnerOne: (winner) => {
      dispatch({ type: 'SET_WINNER_ONE', payload: winner });
    },
    winnerTwo: store.winnerTwo,
    setWinnerTwo: (winner) => {
      dispatch({ type: 'SET_WINNER_TWO', payload: winner });
    },
    winnerThree: store.winnerThree,
    setWinnerThree: (winner) => {
      dispatch({ type: 'SET_WINNER_THREE', payload: winner });
    },
    isWalletConnectModalOpen: store.isWalletConnectModalOpen,
    setWalletConnectModal: (open) => {
      dispatch({ type: 'SET_WALLET_MODAL', payload: open });
    },
    txnStatus: store.txnStatus,
    setTxnStatus: (status) => {
      dispatch({ type: 'SET_TXN_STATUS', payload: status });
    },
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
