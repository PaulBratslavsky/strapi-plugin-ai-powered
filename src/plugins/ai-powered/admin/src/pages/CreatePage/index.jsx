import React, { useState, useEffect } from "react";
import ComboDropDown from "../../components/ComboDropDown";
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

const options = [
  { value: "text-davinci-003", text: "text-davinci-003" },
  { value: "text-curie-001", text: "text-curie-001" },
  { value: "text-babbage-001", text: "text-babbage-001" },
  { value: "text-ada-001", text: "text-ada-001" },
];

export default function CreatePage() {
  const toggleNotification = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = React.useState({
    title: "",
    content: "",
    prompt: "",
    apiKey: "",
    model: "",
  });

  useEffect(async () => {
    const { data } = await api.getSettings();
    setFormData({ ...formData, apiKey: data.apiKey, model: data.model });
    console.log("useEffect");
    isLoading && setIsLoading(false);
  },[])

  if (isLoading) return <div>Loading...</div>;

  function onFieldChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.openAiRequest(formData);
      setFormData({ ...formData, content: res.data.choices[0].text.trim() });
      console.log(res);
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
      <form onSubmit={onSubmit}>
        <Grid gap={5}>
          <GridItem key="title" col={8} sm={12}>
            <Box
              background="neutral0"
              hasRadius
              shadow="filterShadow"
              paddingTop={6}
              paddingBottom={6}
              paddingLeft={7}
              paddingRight={7}
            >
              {" "}
              <Box paddingBottom={6}>
                <TextInput
                  placeholder="Enter note title"
                  label="Prompt"
                  name="prompt"
                  onChange={(e) => onFieldChange(e)}
                  value={formData.prompt}
                />
              </Box>
              <Box paddingBottom={4}>
                <Textarea
                  placeholder="Insert your content to summarize"
                  label="Content"
                  name="content"
                  onChange={(e) => onFieldChange(e)}
                  value={formData.content}
                >
                  {formData.content}
                </Textarea>
              </Box>
            </Box>
          </GridItem>

          <GridItem key="submit" col={4} sm={12}>
            <Box
              background="neutral0"
              hasRadius
              shadow="filterShadow"
              paddingTop={6}
              paddingBottom={6}
              paddingLeft={7}
              paddingRight={7}
            >
              <Box paddingBottom={6}>
                <ComboDropDown
                  name="model"
                  label="Model"
                  options={options}
                  value={formData.model}
                  disabled
                />

                <Stack spacing={4}>
                  <Button type="submit">Submit</Button>
                </Stack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}

// Code reference for error handling notification
// https://github.com/strapi/strapi/blob/f514da73e4c4f3ebe648c61bd3b376fcf09820fa/packages/core/admin/admin/src/content-manager/pages/App/useModels.js#L68-L76
