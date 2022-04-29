//@ts-nocheck
import { useContext } from 'react';
import { Context as ItanksContext } from '../../contexts/ITanks';

const useItanks = () => {
  const { itanks } = useContext(ItanksContext);
  return itanks;
};

export default useItanks;
