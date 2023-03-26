/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NotFound } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';
import CreatePage from '../../pages/CreatePage';
import VideoSummary from '../../pages/VideoSummary';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route path={`/plugins/${pluginId}/create`} component={CreatePage} exact />
        <Route path={`/plugins/${pluginId}/video-summary`} component={VideoSummary} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
