const axios = require("axios");
const { ApplicationError } = require('@strapi/utils').errors;

async function fetchData(apiKey, configuration = {}) {
  try {
    const response = await axios(
      {
        url: 'https://api.openai.com/v1/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey,
        },
        data: { ...configuration }
      }
    )
    return await response.data;
  } catch (err) {
    console.log(err.response.data.error, "err")
    if (err.response.data.error.code === "invalid_api_key") {
      throw new ApplicationError("Please provide a valid API key.");
    } else if (err.response.data.error.code === null) {
      throw new ApplicationError(err.response.data.error.message);
    } else {
      throw new ApplicationError(err, "Internal server error.");
    }
  }

}

module.exports = ({ strapi }) => ({
  async openAiRequest(payload) {
    const apiSettings = await strapi
      .plugin('ai-powered')
      .service('openAi')
      .getSettings();

    // function promptGenerator(payload) {
    //   let prompt = "";
    //   if (payload.content) return payload.promt +":"+ payload.content;
    //   return prompt;
    // }

    const configuration = {
      model: apiSettings.model,
      prompt: payload.prompt,
      max_tokens: 265,
      temperature: 0.9
    }
    // handle error with catch
    return await fetchData(apiSettings.apiKey, configuration);

  },

  async updateSettings(payload) {
    const settings = await strapi.entityService.findMany("plugin::ai-powered.setting");
    if (!settings) {
      return await strapi.entityService.create("plugin::ai-powered.setting", payload);
    } else {
      return await strapi.entityService.update("plugin::ai-powered.setting", settings.id, payload);
    }
  },

  async getSettings() {
    return await strapi.entityService.findMany("plugin::ai-powered.setting");
  },

  async createNote(payload) {
    return await strapi.entityService.create("plugin::ai-powered.note", payload);
  },

  async getNotes() {
    return await strapi.entityService.findMany("plugin::ai-powered.note");
  }
});
