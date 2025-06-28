import { FormEvent, useState } from 'react';
import { register } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Alert } from '@mui/material';

const MoodRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    if (username.length < 3 || username.length > 50) {
      setError('Username must be at least 3 characters and max 50 characters');
      setLoading(false);
      return;
    }

    if (password.length < 6 ) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await register(username, password);
      navigate('/login');
    } catch (error: any) {
      // Try to extract backend error message if available
      if (error.response && error.response.data && error.response.data.detail) {
        setError(error.response.data.detail);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('Registration failed');
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
      {/* Register fields */}
      <TextField
        required
        id="register-username"
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        required
        id="register-password"
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <TextField
        required
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
      >
        {loading ? "Adding user.." : "Register"}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default MoodRegister;