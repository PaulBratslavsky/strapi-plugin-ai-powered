import { request } from "@strapi/helper-plugin";

const api = {
  updateSettings: async (data) => {
    return await request("/ai-powered/update-settings", {
      method: "PUT",
      body: { data: data },
    });
  },
  openAiRequest: async (data) => {
    return await request("/ai-powered/open-ai-request", {
      method: "POST",
      body: { data: data },
    });
  },
};

export default api;

