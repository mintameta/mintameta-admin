//@ts-nocheck
import { useContext } from 'react';
import { Context as DebtsContext } from '../../contexts/Debts';

const useDebts = () => {
  const { debts } = useContext(DebtsContext);
  return debts;
};

export default useDebts;
