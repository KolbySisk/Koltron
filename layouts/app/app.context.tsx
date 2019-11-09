import { createContext } from 'react';

export const AppContext = createContext({ home: true });
export const ContextProvider = AppContext.Provider;
export const ContextConsumer = AppContext.Consumer;
