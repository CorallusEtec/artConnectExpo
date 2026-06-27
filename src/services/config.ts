import axios from "axios";

const axiosClient = axios.create({
  timeout: 5000,
  timeoutErrorMessage: "Falha na conexão com o servidor. Tente mais tarde",
});

const config = {
  /**
   * Se estiver no web use 'localhost'
   * Se estiver no dispositivo fisico, use o ip da máquina
   */
  apiUrl: "http://localhost:8080",

  //apiUrl: "http://10.0.0.179:8080",

  axiosClient,
};

export default config;
