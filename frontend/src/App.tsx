import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/api/ping')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error('Backend connection failed:', err));
  }, []);

  return (
    <div>
      <h1>Frontend + Backend Test</h1>
      <p>Backend says: {message || 'Loading...'}</p>
    </div>
  );
}

export default App;
