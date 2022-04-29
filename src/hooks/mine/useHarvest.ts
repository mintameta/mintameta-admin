//@ts-nocheck
import { useCallback } from 'react';

import useBasisCash from '../useBasisCash';
import useHandleTransactionReceipt from '../useHandleTransactionReceipt';

const useHarvest= (address) => {
  const basisCash = useBasisCash();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(
    () => {
      return handleTransactionReceipt(basisCash.harvest,[address]);
    },
    [basisCash,address],
  );
  return { onReward: handleReward };
};

export default useHarvest;