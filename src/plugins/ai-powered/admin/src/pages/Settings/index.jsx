import React, { useState } from "react";
import api from '../../api/open-ai';
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
} from "@strapi/design-system";

import pluginPermissions from "./../../permissions";
import OpenAiHeader from "../../components/OpenAiHeader";

//pluginPermissions.settingsUpdate

const ProtectedSettingsPage = () => {
  console.log(pluginPermissions.settingsUpdate, "################# pluginPermissions ##################")
  return <CheckPagePermissions permissions={[{ action: `plugin::ai-powered.settings.update`, subject: null }]}>
    <SettingsPage />
  </CheckPagePermissions>
};

const SettingsForm = () => {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);
    const setting = await api.updateSettings(apiKey);
    console.log(setting, "################# setting ##################");
    setIsLoading(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await fetchData();
    alert("Form Submitted!");
  }

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
            <GridItem key="submit" col={12}>
              {apiKey}
              <Button type="submit">Save API Key</Button>
            </GridItem>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <h1>loading state here</h1>;

  return (
    <Main labelledBy="title" aria-busy={isSubmitting}>
      <OpenAiHeader />
      <ContentLayout>
        <SettingsForm />
      </ContentLayout>
    </Main>
  );
};

export default ProtectedSettingsPage;
