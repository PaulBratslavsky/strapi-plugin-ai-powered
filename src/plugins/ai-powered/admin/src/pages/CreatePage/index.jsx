import React, { useState } from "react";
import styled from "styled-components";

import { useIntl } from "react-intl";

import api from "../../api/open-ai";

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

// NOTE: HATE THAT I HAVE TO DO THIS
const StyledTextArea = styled(Textarea)`
    min-height: 750px !important;
`;

export default function CreatePage() {
  const toggleNotification = useNotification();

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
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.openAiRequest(formData);
      console.log(res.data.choices[0].text);
      setFormData({ ...formData, content: res.data.choices[0].text.trim() });
      return res;
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: error.response.data.error.message,
      });
    } finally {
      setIsLoading(false);
    }
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
                <StyledTextArea
                  placeholder="Insert your content to summarize"
                  label="Content"
                  name="content"
                  onChange={(e) => onFieldChange(e)}
                  rows={100}
                >
                  {formData.content}
                </StyledTextArea>
              </GridItem>
              <GridItem key="submit" col={12}>
                <Button type="submit">
                  {isLoading ? "Loading" : "Summarize"}
                </Button>
              </GridItem>
            </Grid>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}

// Code reference for error handling notification
// https://github.com/strapi/strapi/blob/f514da73e4c4f3ebe648c61bd3b376fcf09820fa/packages/core/admin/admin/src/content-manager/pages/App/useModels.js#L68-L76
