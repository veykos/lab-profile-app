import './App.css';
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
