import './App.css';
import { useEffect, useState } from 'react';

const API_BASE = process.env.REACT_APP_API_URL;

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {

    fetch(`${API_BASE}/api/ping`)
      .then(async (res) => {
        const text = await res.text();
        console.log("Raw response:", text);
        try {
          const json = JSON.parse(text);
          setMessage(json.message);
        } catch (err) {
          console.error("❌ Failed to parse JSON:", err);
        }
      })
      .catch((err) => console.error('Fetch failed:', err));
  }, []);

  return (
    <div>
      <h1>Frontend + Backend Test</h1>
      <p>Backend says: {message || 'Loading...'}</p>
    </div>
  );
}

export default App;
