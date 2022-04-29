//@ts-nocheck
import { useContext } from 'react';
import { Context as MinesContext } from '../../contexts/Mines';

const useMines = () => {
  const { mines } = useContext(MinesContext);
  return mines;
};

export default useMines;
