import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/postmood' element={<Post />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
