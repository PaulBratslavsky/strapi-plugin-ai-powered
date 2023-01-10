import { request } from "@strapi/helper-plugin";

const todoRequests = {
  getPromt: async () => {
    return await request("/open-ai/get-promt", {
      method: "GET",
    });
  },
};

export default todoRequests;
