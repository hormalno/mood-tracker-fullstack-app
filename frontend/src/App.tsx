import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import Mood from './pages/Mood';
import Register from './pages/Register';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/postmood' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/mood/:date' element={<Mood />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
