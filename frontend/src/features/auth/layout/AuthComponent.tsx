import { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
  Stack,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { useLogin, useRegister } from '../hooks/authHooks';
import { validateEmail, validatePassword } from '../middlewares/validators';
import { useNavigate } from 'react-router-dom';
import { showWarningToast } from '../../../shared/utils/toast';
// import FrontPageRoutes from '../../../shared/routes/pageRoutes';


export default function AuthComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [validationError, setValidationError] = useState('');

  const navigate = useNavigate();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email || !password) {
      setValidationError('Please fill in all fields');
      
      return;
    }

    const isValid = validateEmail(email);

    if (!isValid) {
      setValidationError('Please enter a valid email address');
      showWarningToast("Invalid Email: Please enter a valid email address")
      return;
    }

    // Only validate password strength for registration, not for login
    if (!isLogin) {
      const isPasswordValid = validatePassword(password);
      if (!isPasswordValid) {
        setValidationError('Password must be at least 6 characters long and contain at least one number and one special character');
        showWarningToast("Weak Password: at least 6 characters are expected with symbols and numbers")
        return;
      }
    }

    try {
      if (isLogin) {
        await loginMutation.mutateAsync({ email, password });
        // Small delay to ensure token is saved to localStorage
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        await registerMutation.mutateAsync({ email, password });
        // After successful registration, clear form and switch to login mode
        setEmail('');
        setPassword('');
        setValidationError('');
        setIsLogin(true);
      }
    } catch (error) {
      // Error is already handled by the mutation's onError callback with toast
      // This catch block is just for logging purposes
      console.error('Authentication error:', error);
    }
  };

  const isLoading = isLogin ? loginMutation.isPending : registerMutation.isPending;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ width: '100%', p: 4, borderRadius: 2 }}>
          {/* Header */}
          <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center' }}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mb: 3 }}>
            {isLogin ? 'Sign in to your account' : 'Register for a new account'}
          </Typography>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Email Field */}
            <TextField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              error={!!validationError && validationError.toLowerCase().includes('email')}
            />

            {/* Password Field */}
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
              fullWidth
              variant="outlined"
              size="medium"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: 'action.active', mr: 1 }} />
                  </InputAdornment>
                ),
              }}
              error={!!validationError && validationError.toLowerCase().includes('password')}
            />

            {/* Validation Error Alert */}
            {validationError && <Alert severity="error">{validationError}</Alert>}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              fullWidth
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                textTransform: 'none',
                fontSize: '1rem',
                mt: 1,
              }}
            >
              {isLoading ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularProgress size={20} color="inherit" />
                  <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                </Stack>
              ) : isLogin ? (
                'Sign In'
              ) : (
                'Register'
              )}
            </Button>

            {/* Toggle Auth Mode */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <Link
                  component="button"
                  type="button"
                  variant="body2"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsLogin(!isLogin);
                    setValidationError('');
                  }}
                  sx={{ ml: 0.5, cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {isLogin ? 'Register' : 'Sign In'}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
