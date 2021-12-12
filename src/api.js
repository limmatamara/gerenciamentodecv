import axios from "axios";

export default axios.create ({
  baseURL: `https://gerenciamento-cv.herokuapp.com`
})