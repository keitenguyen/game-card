import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import CardContainer from './src/components/CardContainer';

const App: () => Node = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <CardContainer />
    </SafeAreaView>
  );
};

export default App;
