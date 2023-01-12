import React, { useState } from "react";
import { useIntl } from "react-intl";

import api from "../../api/open-ai";
import getTrad from "../../utils/getTrad";

import {
  Box,
  TextInput,
  Textarea,
  Button,
  Stack,
  Grid,
  GridItem,
} from "@strapi/design-system";

import { useNotification } from "@strapi/helper-plugin";

export default function CreatePage() {
  const toggleNotification = useNotification();
  const { formatMessage } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    prompt: "",
  });

  function onFieldChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      return await api.openAiRequest(formData);
      // TODO: Question aout error handling front and back
    } catch (err) {
      toggleNotification({
        type: "warning",
        message: formatMessage({
          // TODO: Question aout the trad
          id: getTrad("Settings.ai-powered.plugin.notification.api.error"),
          defaultMessage: "Please check that you providede the correct API key",
        }),
      });
    }

    setIsLoading(false);
  }

  return (
    <Box padding={8} background="neutral100">
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
              <GridItem key="title" col={12}>
                <TextInput
                  placeholder="Enter note title"
                  label="Title"
                  name="title"
                  error={
                    formData.title.length > 5 ? "Title is too long" : undefined
                  }
                  onChange={(e) => onFieldChange(e)}
                  value={formData.title}
                />
              </GridItem>
              <GridItem key="content" col={12}>
                <Textarea
                  placeholder="Insert your content to summarize"
                  label="Content"
                  name="content"
                  onChange={(e) => onFieldChange(e)}
                >
                  {formData.content}
                </Textarea>
              </GridItem>
              <GridItem key="submit" col={12}>
                <Button type="submit">Summarize</Button>
              </GridItem>
            </Grid>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
