import { useState } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/articles');
  };

  const renderForm = (
    <>
      <form action="" onSubmit={handleClick}>
        <Stack spacing={3} sx={{ mt: 4 }}>
          <TextField
            required
            name="user"
            label="User"
            value={username}
            error={username.length === 0}
            helperText={!username.length ? 'Required field' : ''}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <TextField
            required
            name="email"
            label="Email"
            type="email"
            value={email}
            error={email.length === 0}
            helperText={!email.length ? 'Required field' : ''}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <TextField
            required
            name="password"
            label="Password"
            value={pass}
            error={pass.length === 0}
            helperText={!pass.length ? 'Required field' : ''}
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Register
        </LoadingButton>
      </form>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Already Registered?
        <Link variant="subtitle2" href="/login" sx={{ ml: 0.5 }}>
          Login
        </Link>
      </Typography>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <center>
            <Typography variant="h3">Register</Typography>
          </center>

          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
