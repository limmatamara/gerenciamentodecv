import axios from "axios";

const api = axios.create ({
  baseURL: `https://gerenciamento-cv.herokuapp.com/swagger-ui/`
})

export default api;