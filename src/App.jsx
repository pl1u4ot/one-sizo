import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './assets/Home/Home';
import Katalog from './assets/Katalog/Katalog';
import './App.css';
import Shop from './assets/Cart/Cart'
import Search from './assets/Search/SearchMenu'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/Katalog" element={<Katalog />} />
      <Route path="/Cart" element={<Shop />} />
      <Route path="/Search" element={<Search/>} />
    </Routes>
  );
}


export default App;
