import { request } from "@strapi/helper-plugin";

const api = {
  getPromt: async () => {
    return await request("/open-ai/get-promt", {
      method: "GET",
    });
  },
  updateSettings: async (apiKey) => {
    return await request("/setting/update-setting", {
      method: "PUT",
      body: {
        data: {
          apiKey: apiKey
        }
      },
    });
  },
};

export default api;

