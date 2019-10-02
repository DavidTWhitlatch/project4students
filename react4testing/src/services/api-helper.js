const axios = require('axios');
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export const loginUser = async (loginData) => {
  const resp = await api.post(`/user_token`, { auth: loginData });
  return resp.data
}

export const registerUser = async (registerData) => {
  const resp = await api.post(`/users`, { user: registerData });
  return resp.data;
}

export const showFood = async () => {
  const resp = await api.get(`/foods`)
  return resp.data;
}

export const showFlavors = async () => {
  const resp = await api.get(`/flavors`)
  return resp.data;
}

export const showFoodItem = async (id) => {
  const resp = await api(`/foods/${id}`)
  return resp.data;
}

export const postFood = async (item) => {
  const resp = await api.post(`/foods`, item, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
  return resp.data
}

export const putFood = async (item, id) => {
  const resp = await api.put(`/foods/${id}`, item, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } }, item)
  return resp.data
}
export const destroyFood = async (id) => {
  const resp = await api.delete(`/foods/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } });
  return resp.data;
}

export const putFoodFlavor = async (food_id, id) => {
  const resp = await api.put(`/foods/${food_id}/flavors/${id}`, null, { headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` } })
  return resp.data
}


