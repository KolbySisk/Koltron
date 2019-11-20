import React from 'react';
import App from 'next/app';
import { interpret } from 'xstate';
import { AnimatePresence } from 'framer-motion';
import { chatMachine } from '../components/Chat/chat.machine';
import { ChatServiceProvider } from '../components/Chat/chat.context';

class MyApp extends App {
  state = {
    chatMachineState: chatMachine.initialState,
  };

  chatMachineService = interpret(chatMachine).onTransition(current =>
    this.setState({ chatMachineState: current })
  );

  componentDidMount() {
    this.chatMachineService.start();
  }

  componentWillUnmount() {
    this.chatMachineService.stop();
  }

  render() {
    const { Component, pageProps, router } = this.props;
    const { chatMachineState } = this.state;
    const chatMachineSend = this.chatMachineService.send;

    return (
      <ChatServiceProvider value={{ chatMachineState, chatMachineSend }}>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ChatServiceProvider>
    );
  }
}

export default MyApp;
