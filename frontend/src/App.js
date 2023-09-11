import './App.css';

import Keys from './components/Keys.js/Keys';
import Navbar from './components/Navbar/Navbar';
import Signatures from './components/Signatures/Signatures';
import Transaction from './components/Transaction/Transaction';
import Blockchain from './components/Blockchain/Blockchain';

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
        <Route path = '/blockchain' element={<Blockchain />}/>
      </Routes>
    </div>
  );
}

export default App;
