const fs = require('fs');
const { ApplicationError } = require('@strapi/utils').errors;
const { Configuration, OpenAIApi } = require("openai");

function configureOpenAi(apiKey) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  return new OpenAIApi(configuration);
}

module.exports = ({ strapi }) => ({
  async openAiRequest(payload, type = "completion") {
    const apiSettings = await strapi
      .plugin('ai-powered')
      .service('openAi')
      .getSettings();

    const openai = configureOpenAi(apiSettings.apiKey);
    const defaultPrompt = "summarize the following text into a blog post with sections and return in markdown:";

    async function createCompletion(payload) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: payload.prompt || defaultPrompt + payload.content,
        temperature: 0.7,
        max_tokens: 1383,
      });
      console.log(response.data, "response.data")
      return response.data;
    }

    async function createTranscription(payload) {
      const audioFile = fs.createReadStream(payload.audioFilePath);
      try {
        const response = await openai.createTranscription(audioFile, "whisper-1");
        return response.data;
      } catch (error) {
        throw new ApplicationError("Invalid audio file: Please provide a valid audio file");
      }
    }

    switch (type) {
      case "completion":
        return await createCompletion(payload);
      case "transcription":
        return await createTranscription(payload);
      default:
        throw new ApplicationError("Invalid type: Please provide a valid type");
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

  async getSettings() {
    return await strapi.entityService.findMany("plugin::ai-powered.setting");
  },

  async createNote(payload) {
    return await strapi.entityService.create("plugin::ai-powered.note", payload);
  },

  async getNotes() {
    return await strapi.entityService.findMany("plugin::ai-powered.note");
  },

  async createVideoSummary(payload) {

  }
});
