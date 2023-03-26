/*
 *
 * HomePage
 *
 */

import React from 'react';
import { useHistory } from "react-router-dom";
import { EmptyStateLayout, Box, Button, } from '@strapi/design-system';
import Illo from '../../components/Illo';
import Plus from '@strapi/icons/Plus';

// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

const HomePage = () => {
  const history = useHistory();
  return (
    <div>
      <Box padding={8} background="neutral100">
        <EmptyStateLayout icon={<Illo />} content="Let's summarize some content with AI..." action={<Button
          onClick={() => history.push(`/plugins/${pluginId}/video-summary`)}
          variant="secondary" startIcon={<Plus />}>
          Create new summary
        </Button>} />
      </Box>
    </div>
  );
};

export default HomePage;
