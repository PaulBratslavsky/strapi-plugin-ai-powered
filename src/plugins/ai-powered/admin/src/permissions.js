import pluginId from './pluginId';


// TODO: UNDERSTNAND ALL THESE OPTIONS
const permissions = [
  { action: `plugin::${pluginId}.read`, subject: null },
  { action: `plugin::${pluginId}.update`, subject: null },
  { action: `plugin::${pluginId}.delete`, subject: null },
  { action: `plugin::${pluginId}.create`, subject: null }
];

const pluginPermissions = {
  // This permission regards the main component (App) and is used to tell
  // If the plugin link should be displayed in the menu
  // And also if the plugin is accessible. This use case is found when a user types the url of the
  // plugin directly in the browser
  permissions
};

export default pluginPermissions;