const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
    }
    return data;
};

// Auth Calls
export const login = (credentials) => fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
}).then(handleResponse);

export const register = (credentials) => fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
}).then(handleResponse);

// Sweets Calls
export const fetchSweets = () => fetch(`${API_URL}/sweets`, { headers: getAuthHeaders() }).then(handleResponse);
export const createSweet = (sweetData) => fetch(`${API_URL}/sweets`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(sweetData),
}).then(handleResponse);

export const updateSweet = (id, sweetData) => fetch(`${API_URL}/sweets/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(sweetData),
}).then(handleResponse);

export const deleteSweet = (id) => fetch(`${API_URL}/sweets/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
}).then(handleResponse);

export const purchaseSweet = (id) => fetch(`${API_URL}/sweets/${id}/purchase`, {
    method: 'POST',
    headers: getAuthHeaders(),
}).then(handleResponse);

export const searchSweets = async (params) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/sweets/search?${query}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  };