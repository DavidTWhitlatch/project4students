const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3001'
});

export const loginUser = async (loginData) => {
  const resp = await api.post(`/auth/login`, loginData);
  return resp.data
}

export const registerUser = async (resgisterData) => {
  const resp = await api.post(`/auth/register`, resgisterData);
  return resp.data;
}

export const showFood = async () => {
  const resp = await api.get(`/food`)
  return resp.data;
}

export const showFlavors = async () => {
  const resp = await api.get(`/flavors`)
  return resp.data;
}

export const showFoodItem = async (id) => {
  const resp = await api(`/food/${id}`)
  return resp.data;
}

export const postFood = async (item) => {
  const resp = await api.post(`/food`, item, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
  return resp.data
}

export const putFood = async (item, id) => {
  const resp = await api.put(`/food/${id}`, item, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }, item)
  return resp.data
}
export const destroyFood = async (id) => {
  const resp = await api.delete(`/food/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } });
  return resp.data;
}

export const putFoodFlavor = async (food_id, id) => {
  const resp = await api.put(`/food/${food_id}/flavors/${id}`, null, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
  return resp.data
}


