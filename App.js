import React from 'react';
import Fecha from './Components/Fecha'
import FechaProvider from './Context/index'
import './App.scss'

const App = (props) => {
  return (
    <FechaProvider>
      <div className="container">
        <h1>Valor del Dólar</h1>
        <Fecha />
      </div>

    </FechaProvider>
  );
}

export default App;
