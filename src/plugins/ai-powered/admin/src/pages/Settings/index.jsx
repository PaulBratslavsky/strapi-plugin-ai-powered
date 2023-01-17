import React, { useState, useEffect } from "react";
import api from "../../api/open-ai";
import { CheckPagePermissions } from "@strapi/helper-plugin";
import {
  ContentLayout,
  Main,
  Box,
  TextInput,
  Button,
  Stack,
  Grid,
  GridItem,
  Combobox,
  ComboboxOption,
} from "@strapi/design-system";

import pluginPermissions from "./../../permissions";
import OpenAiHeader from "../../components/OpenAiHeader";

const ProtectedSettingsPage = () => {
  return (
    <CheckPagePermissions permissions={pluginPermissions.settingsUpdate}>
      <SettingsPage />
    </CheckPagePermissions>
  );
};

const SettingsForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [option, setOption] = useState("text-davinci-300");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    const { data } = await api.getSettings();
    setApiKey(data.apiKey);
    setOption(data.model);
  }, []);

  const updateData = async () => {
    if (isLoading === false) setIsLoading(true);
    await api.updateSettings({ data: { apiKey: apiKey, model: option } });
    setIsLoading(false);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await updateData();
  }

  console.log("apiKey", apiKey, "option", option);

  return (
    <Box
      background="neutral0"
      hasRadius
      shadow="filterShadow"
      paddingTop={6}
      paddingBottom={6}
      paddingLeft={7}
      paddingRight={7}
    >
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <Grid gap={5}>
            <GridItem key="apiKey" col={12}>
              <TextInput
                placeholder="OpenAI API Key"
                label="OpenAI API Key"
                name="apiKey"
                type="password"
                error={false}
                onChange={(e) => setApiKey(e.target.value)}
                value={apiKey}
              />
            </GridItem>
            <GridItem key="apiKey" col={12}>
              <Combobox label="Model" value={option} onChange={setOption}>
                <ComboboxOption value="text-davinci-300">
                  text-davinci-300
                </ComboboxOption>
                <ComboboxOption value="text-curie-001">
                  text-curie-001
                </ComboboxOption>
                <ComboboxOption value="text-babbage-001">
                  text-babbage-001
                </ComboboxOption>
                <ComboboxOption value="text-ada-001">
                  text-ada-001
                </ComboboxOption>
              </Combobox>
            </GridItem>
            <GridItem key="submit" col={12}>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving Settings" : "SaveSettings"}
              </Button>
            </GridItem>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};

const SettingsPage = () => {
  return (
    <Main labelledBy="title">
      <OpenAiHeader />
      <ContentLayout>
        <SettingsForm />
      </ContentLayout>
    </Main>
  );
};

export default ProtectedSettingsPage;
