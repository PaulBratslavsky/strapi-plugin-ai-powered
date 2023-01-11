import { request } from "@strapi/helper-plugin";

const api = {
  testRequest: async (data) => {
    return await request("/ai-powered/update-settings", {
      method: "PUT",
      body: { data: data },
    });
  },
};

export default api;

