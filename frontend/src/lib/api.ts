const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') || 'http://localhost:4000/api';

const normalizePath = (path: string) => (path.startsWith('/') ? path : `/${path}`);

const getAuthHeaders = () => {
  const token = localStorage.getItem('korima-admin-token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${normalizePath(path)}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(init?.headers || {}),
    },
    ...init,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('korima-admin-token');
      localStorage.removeItem('korima-admin');
      window.location.href = '/login';
    }
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function sendForm<T>(path: string, formData: FormData, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${normalizePath(path)}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      ...getAuthHeaders(),
      ...(init?.headers || {}),
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('korima-admin-token');
      localStorage.removeItem('korima-admin');
      window.location.href = '/login';
    }
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export const api = {
  baseUrl: API_BASE,
  fetchJson,
  sendForm,
  getAuthHeaders,
};
