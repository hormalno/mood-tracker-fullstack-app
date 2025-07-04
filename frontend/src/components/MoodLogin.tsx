import { FormEvent, useState } from 'react';
import { login } from '../api/user';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';

const MoodLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(username, password);
      navigate('/home');
    } catch (error: any) {
      // Try to extract backend error message if available
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Wrong credentials');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        '& .MuiTextField-root': { width: '100%' }
      }}
      noValidate
      autoComplete="off"
    >
      {/* Login fields */}
      <TextField
        required
        id="login-username"
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        autoComplete="username"
      />
      <TextField
        required
        id="login-password"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}      
      <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center' }}>
        "Don't have an account? <Link to="/register">Register here</Link>."
      </Typography>
    </Box>
  );
};

export default MoodLogin;