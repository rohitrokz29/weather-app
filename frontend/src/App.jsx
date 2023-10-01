import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from './components/Banner';
import Home from './components/Home';
function App() {

  return (
    <BrowserRouter>
      <Banner />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
