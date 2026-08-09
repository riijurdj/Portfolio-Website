import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5050/api';

const client = axios.create({ baseURL });

function authHeaders() {
  const token = localStorage.getItem('admin-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchPortfolio() {
  const { data } = await client.get('/portfolio');
  return data;
}

export async function loginRequest(email, password) {
  const { data } = await client.post('/auth/login', { email, password });
  return data;
}

export async function verifyTokenRequest(token) {
  const { data } = await client.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
  return data;
}

export async function sendContactMessage(payload) {
  const { data } = await client.post('/contact', payload);
  return data;
}

export async function adminPut(path, body) {
  const { data } = await client.put(`/admin/${path}`, body, { headers: authHeaders() });
  return data;
}

export async function adminPost(path, body) {
  const { data } = await client.post(`/admin/${path}`, body, { headers: authHeaders() });
  return data;
}

export async function adminDelete(path) {
  const { data } = await client.delete(`/admin/${path}`, { headers: authHeaders() });
  return data;
}

export async function adminUploadPhoto(file, target = 'hero') {
  const formData = new FormData();
  formData.append('photo', file);
  const { data } = await client.post(`/admin/upload-photo?target=${target}`, formData, {
    headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function adminUploadResume(file) {
  const formData = new FormData();
  formData.append('resume', file);
  const { data } = await client.post('/admin/upload-resume', formData, {
    headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function updateCredentialsRequest(payload) {
  const { data } = await client.put('/admin/credentials', payload, { headers: authHeaders() });
  return data;
}

export default client;
