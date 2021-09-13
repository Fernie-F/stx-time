import { Provider } from 'jotai';
import React from 'react';
import './App.css';
import { ConverterContainer } from './components/converterContainer';
import { TopBar } from './components/topBar';

function App() {
  return (
    <div className="App">
      <Provider>
        <TopBar />
        <ConverterContainer/>
      </Provider>
    </div>
  );
}

export default App;
