const API_URL = 'http://localhost:5000/api';


const getAuthHeader = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

export const api = {
  // --- AUTH APIs ---
  login: async (userData) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  register: async (userData) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  
  
  
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    return res.json();
  },

  
  getMyProducts: async () => {
    const res = await fetch(`${API_URL}/products/myproducts`, {
      method: 'GET',
      headers: getAuthHeader()
    });
    return res.json();
  },

  createProduct: async (productData) => {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  
  updateProduct: async (id, productData) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: getAuthHeader(),
      body: JSON.stringify(productData)
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader()
    });
    return res.json();
  }
};