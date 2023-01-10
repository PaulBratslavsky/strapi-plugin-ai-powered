import React from "react";
import {
  Box,
  TextInput,
  Textarea,
  Button,
  Stack,
  Grid,
  GridItem,
} from "@strapi/design-system";

export default function CreatePage(action = () => null) {
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
    action(formData);
    alert("Form Submitted!");
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
              <GridItem key="name" col={12}>
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
              <GridItem key="name" col={12}>
                <Textarea
                  placeholder="Insert your content to summarize"
                  label="Content"
                  name="content"
                  onChange={(e) => onFieldChange(e)}
                >
                  {formData.content}
                </Textarea>
              </GridItem>
              <GridItem key="name" col={12}>
                <Button type="submit">Summarize</Button>
              </GridItem>
            </Grid>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}
