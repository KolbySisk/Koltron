import React from 'react';

type ChatServiceContextType = {
  chatMachineState: any;
  chatMachineSend: any;
};

const ChatServiceContext = React.createContext<Partial<ChatServiceContextType>>({});

export const ChatServiceProvider = ChatServiceContext.Provider;
export const ChatServiceConsumer = ChatServiceContext.Consumer;
export default ChatServiceContext;
