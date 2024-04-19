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
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const theme = useTheme();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};
    if (!formData.username.trim()) {
      formErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) {
      formErrors.password = 'Password is required';
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      await fetch('https://api.realworld.io/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: formData }),
      })
        .then(async (e) => {
          const data = await e.json();
          if (e.status === 201) {
            localStorage.setItem('user', JSON.stringify(data.user));
            setErrors({});
            router.push('/articles');
          }
          const serverErrors = {};
          Object.keys(data.errors).forEach((key) => {
            serverErrors[key] = data.errors[key].join(', ');
          });
          setErrors(serverErrors);
          alert(e.errors.email);
          formErrors.password = e.errors.password;
        })
        .catch((e) => {
          console.log(e);
        });
      console.log('Form submitted:', formData);
    }
  };

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

          <form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mt: 4 }}>
              <TextField
                name="username"
                label="User"
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <TextField
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
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
        </Card>
      </Stack>
    </Box>
  );
}
