import React from 'react';
import Fecha from './Components/Fecha'
import FechaProvider from './Context/index'

const App = (props) => {
  return (
    <FechaProvider>
      <h1>Dólar</h1>
      <Fecha />
    </FechaProvider>
  );
}

export default App;
