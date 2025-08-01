import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const MoodNavbar = () => {

  const pages = [
    {label: "Home", path: "/home"}, 
    {label: "Post", path: "/postmood"}
  ];

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (    
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex',  alignItems: 'center'}}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AddReactionIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mood Tracker
            </Typography>
            <Box sx={{ ml: 4, display: 'flex' }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  to={page.path}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </Box>
          <Box>
            {isAuthenticated ? (
              <Button 
                color="inherit"
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
              >
                Logout
              </Button>
            ) : (
              <Button 
                color="inherit"
                component={Link}
                to="/login"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MoodNavbar;