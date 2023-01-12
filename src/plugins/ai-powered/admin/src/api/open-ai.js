import axios from '../utils/axiosInstance';

const api = {
  updateSettings: async (data) => {
    return await axios.put("/ai-powered/update-settings", data);
  },
  getSettings: async () => {
    return await axios.get("/ai-powered/get-settings");
  },
  openAiRequest: async (data) => {
    return await axios.post("/ai-powered/open-ai-request", data);
  },
};

export default api;

