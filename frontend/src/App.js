import './App.css';

import Keys from './components/Keys.js/Keys';
import Navbar from './components/Navbar/Navbar';
import Signatures from './components/Signatures/Signatures';
import Transaction from './components/Transaction/Transaction';

import {Route, Routes} from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Keys />}/>
        <Route path="/keys" element={<Keys />}/>
        <Route path="/signatures" element={<Signatures />}/>
        <Route path="/transaction" element={<Transaction />}/>
      </Routes>
    </div>
  );
}

export default App;
