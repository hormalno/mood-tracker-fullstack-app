import api from "../services/Axios";

export async function login(username: string, password: string) {
  const response = await api.post('/api/user/login', { username, password });
  const { access_token } = response.data;
  if (access_token) {
    localStorage.setItem('token', access_token);
  }
  return response.data;
}