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
          'Authorization': `Bearer ${apiKey}`,
        },
        data: {
          "prompt": "This is a test",
          "max_tokens": 5,
          "temperature": 0.9
        }
      }
    )
    return await response.data;
  } catch (err) {
    throw new ApplicationError(err.response.data.error.message);
  }

}

module.exports = ({ strapi }) => ({
  async openAiRequest(payload) {
    const apiSettings = await strapi
      .plugin('ai-powered')
      .service('openAi')
      .getSettings();

    console.log(apiSettings);
    // const configuration = {
    //   model: "text-davinci-003",
    //   prompt: "This is a test",
    //   max_tokens: Number(1000),
    //   temperature: 0.9,
    //   top_p: 1,
    //   frequency_penalty: 0.52,
    //   presence_penalty: 0.9,
    //   n: 1,
    //   best_of: 2,
    //   stream: false,
    //   logprobs: null,
    // }

    // handle error with catch
    try {
      return await fetchData(apiSettings.apiKey, {});
    } catch (err) {
      console.log(err);
      throw new ApplicationError("err.response.data.error.message");
    }

  },
  async updateSettings(payload) {
    const settings = await strapi.entityService.findMany("plugin::ai-powered.setting");
    if (!settings) {
      return await strapi.entityService.create("plugin::ai-powered.setting", payload);
    } else {
      return await strapi.entityService.update("plugin::ai-powered.setting", settings.id, payload);
    }
  },
  async sendPrompt(payload) {

  },
  async getSettings() {
    return await strapi.entityService.findMany("plugin::ai-powered.setting");
  },
});
