import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/Home/Home';
import Katalog from './assets/Katalog/Katalog';
import './App.css';
import Shop from './assets/Cart/Cart'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Katalog" element={<Katalog />} />
      <Route path="/Cart" element={<Shop />} />
    </Routes>
  );
}


export default App;
