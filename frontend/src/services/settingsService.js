import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5001/api/settings' })

export const updateSetting = (id, value) => {
  const newSet = { [id]: value }
  return API.patch('/1', newSet)
    .then(res => console.log(res.data))
    .catch(err => console.error(err))
}

export const getSettings = () => {
  return API.get('/')
}
