import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.js';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
