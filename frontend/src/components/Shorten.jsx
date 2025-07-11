import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Box, Alert } from '@mui/material';
import api from '../api';

const emptyEntry = { url: '', alias: '', validity: 30 };

const Shortener = () => {
  const [form, setForm] = useState(emptyEntry);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    try {
      const res = await api.post('/shortenurl', {
        url: form.url,
        validity: form.validity,
        shortcode: form.alias
      });

      setResult(res.data);
      setForm(emptyEntry);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Box maxWidth="sm" mx="auto" mt={5}>
      <Typography variant="h5" mb={2}>Simple URL Shortener</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Original URL"
            name="url"
            fullWidth
            required
            value={form.url}
            onChange={handleChange}
          />
          <TextField
            label="Custom Alias (optional)"
            name="alias"
            fullWidth
            value={form.alias}
            onChange={handleChange}
          />
          <TextField
            label="Validity (days)"
            name="validity"
            type="number"
            inputProps={{ min: 1 }}
            value={form.validity}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Shorten 🚀
          </Button>
        </Stack>
      </form>

      {result && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Shortened Link: <a href={result.shortLink} target="_blank" rel="noreferrer">{result.shortLink}</a><br />
          Expires on: {new Date(result.expiry).toLocaleString()}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>
      )}
    </Box>
  );
};

export default Shortener;
