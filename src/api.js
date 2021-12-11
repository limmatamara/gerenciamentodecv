import axios from "axios";

const api = axios.create ({
  baseURL: `https://gerenciamento-cv.herokuapp.com`
})

export default api;