import axios from "axios";

const axiosClient = axios.create({
  timeout: 7000,
  timeoutErrorMessage: "Falha na conexão com o servidor. Tente mais tarde",
});

const config = {

    apiUrl: "http://localhost:8080",
  


  axiosClient,
};

export default config;
