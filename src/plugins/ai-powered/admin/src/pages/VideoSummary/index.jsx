import React, { useState } from "react";
import styled from "styled-components";
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
    url: "",
    transcription: "",
    content: "",
  });

  function onFieldChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onTranscriptSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.createVideoTranscription(formData);
      console.log(res, "#########################################");
      const data = res.data.data.text.trim();
      setFormData({ ...formData, transcription: data });
    } catch (error) {
      toggleNotification({
        type: "warning",
        message: error.response.data.error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function onContentSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log(formData, "#########################################");
      const res = await api.createTranscriptionSummary(formData);
      console.log(res, "#########################################");
      const data = res.data.data.choices[0].text.trim();
      setFormData({ ...formData, summary: data });
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
        <form onSubmit={onTranscriptSubmit}>
          <Stack spacing={4}>
            <Grid gap={5}>
              <GridItem key="title" col={12}>
                <TextInput
                  placeholder="Enter your YouTube URL"
                  label="YouTube URL"
                  name="url"
                  // error={
                  //   formData.url.length < 5 ? "Title is too short" : undefined
                  // }
                  onChange={(e) => onFieldChange(e)}
                  value={formData.title}
                />
              </GridItem>

              <GridItem key="submit" col={12}>
                <Button type="submit">
                  {isLoading ? "Loading" : "Transcribe"}
                </Button>
              </GridItem>
            </Grid>
          </Stack>
        </form>
        {formData.transcription && (
          <form onSubmit={onContentSubmit}>
            <Grid>
              <GridItem key="transcription" col={12}>
                <StyledTextArea
                  label="Transcription"
                  name="transcription"
                  rows={100}
                  onChange={(e) => setFormData({ ...formData, transcription: e.target.value })}
                >
                  {formData.transcription}
                </StyledTextArea>
              </GridItem>
              <GridItem key="submit" col={12}>
                <Button type="submit">
                  {isLoading ? "Loading" : "Summarize"}
                </Button>
              </GridItem>
            </Grid>
          </form>
        )}
         {formData.summary && (
            <Grid>
              <GridItem key="summary" col={12}>
                <StyledTextArea
                  label="Summary"
                  name="summary"
                  rows={100}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                >
                  {formData.summary}
                </StyledTextArea>
              </GridItem>
            </Grid>
        )}
      </Box>
    </Box>
  );
}

// Code reference for error handling notification
// https://github.com/strapi/strapi/blob/f514da73e4c4f3ebe648c61bd3b376fcf09820fa/packages/core/admin/admin/src/content-manager/pages/App/useModels.js#L68-L76
