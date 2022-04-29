import { createContext } from 'react';
import { Mine } from '../../basis-cash';

export interface MinesContext {
  mines: Mine[];
}

const context = createContext<MinesContext>({
  mines: [],
});

export default context;
