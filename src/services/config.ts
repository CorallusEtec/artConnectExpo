import axios from "axios";

const axiosClient = axios.create({
  timeout: 5000,
  timeoutErrorMessage: "Falha na conexão com o servidor. Tente mais tarde",
});

/**
 * Se estiver no web use 'localhost'
 * Se estiver no dispositivo fisico, use o ip da máquina
 */
const domain = "192.168.15.5";

const config = {
  axiosClient,
  apiUrl: `http://${domain}:8080`,
  wsUrl: `http://${domain}:8080/ws`,
};

export default config;
