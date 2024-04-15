import logo from './logo.svg';
import {BrowserRouter,Routes,Route}from 'react-router-dom'
import './App.css';
import Data from './data'
import Lay from './Layout';
import Searchdata from './Search'
import Charts from './Charts'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Lay/>}>
          <Route path='Data' element={<Data/>}/>
          <Route path='Searchdata' element={<Searchdata/>}/>
          <Route path='chart' element={<Charts/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
