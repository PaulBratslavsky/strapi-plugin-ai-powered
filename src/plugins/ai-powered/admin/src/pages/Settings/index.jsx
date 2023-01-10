import React, { useState } from "react";

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

import pluginPermissions from "../../permissions";
import OpenAiHeader from "../../components/OpenAiHeader";

const ProtectedSettingsPage = () => (
  <CheckPagePermissions permissions={pluginPermissions.settings}>
    <SettingsPage />
  </CheckPagePermissions>
);

const SettingsForm = () => {
  const [apiKey, setApiKey] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
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
            <GridItem key="name" col={12}>
              <TextInput
                placeholder="OpenAI API Key"
                label="OpenAI API Key"
                name="key"
                type="password"
                error={false}
                onChange={(e) => setApiKey(e.target.value)}
                value={apiKey}
              />
            </GridItem>
            <GridItem key="name" col={12}>
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
