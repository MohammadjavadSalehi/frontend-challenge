import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function NewArticle() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch('https://api.realworld.io/api/tags')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch tags');
        }
        return response.json();
      })
      .then((data) => {
        setTags(data.tags);
      })
      .catch((error) => {
        console.error('Error fetching tags:', error);
        setTags([]);
      });
  }, []);

  const handleTagSelect = (tag) => {
    if (selectedTags.includes(tag)) {
      // Deselect the tag
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      // Select the tag
      setSelectedTags([...selectedTags, tag]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    if (!formData.title.trim()) {
      formErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      formErrors.description = 'Description is required';
    }
    if (!formData.body.trim()) {
      formErrors.body = 'Body is required';
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      await fetch('https://api.realworld.io/api/articles', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            'Token ' +
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyMTkxNH0sImlhdCI6MTcxNDUwMDQ4MSwiZXhwIjoxNzE5Njg0NDgxfQ.b9VVVtYpgivUOoXWxpv6DL6PVReavNVSGR1VxjHjXiM',
        },
        body: JSON.stringify({ article: { ...formData, tags: selectedTags } }),
      })
        .then(async (r) => {
          const data = await r.json();
          if (r.ok) {
            setErrors({});
            toast.success('Article created successfully');
            setTimeout(() => {
              router.push('/articles');
            }, 2000);
          } else {
            toast.error('Article not created successfully');
            const serverErrors = {};
            Object.keys(data.errors).forEach((key) => {
              serverErrors[key] = data.errors[key].join(', ');
            });
            setErrors(serverErrors);
            alert(r.errors.email);
            formErrors.password = r.errors.password;
          }
        })
        .catch((r) => {
          console.log(r);
        });
    }
  };

  return (
    <Container>
      <ToastContainer position="top-right" rtl closeOnClick pauseOnHover theme="colored" />
      <Stack sx={{ height: 1, width: '60%' }}>
        <Typography variant="h3">New Article</Typography>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 50 }}>
            <Stack spacing={3} sx={{ mt: 4, width: '100%' }}>
              <TextField
                name="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
              <TextField
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
              />
              <TextField
                name="body"
                label="Body"
                multiline
                rows={5}
                value={formData.body}
                onChange={handleChange}
                error={!!errors.body}
                helperText={errors.body}
              />
            </Stack>
            <Stack sx={{ width: '80%', justifyContent: 'flex-end' }}>
              {tags && (
                <>
                  <Typography variant="h6">Tags</Typography>
                  <ul style={{ width: '100%', listStyle: 'none' }}>
                    {tags?.map((tag) => (
                      <li key={tag}>
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag)}
                          onChange={() => handleTagSelect(tag)}
                        />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Stack>
          </div>

          <LoadingButton
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Submit
          </LoadingButton>
        </form>
      </Stack>
    </Container>
  );
}
