import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const updateData = async () => {
    if (isLoading === false) setIsLoading(true);
    await api.updateSettings({ apiKey: apiKey });
    setIsLoading(false);
  };

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    await updateData();
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
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving Your Key" : "Save Your Key"}
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
