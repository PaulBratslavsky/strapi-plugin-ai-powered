import React from "react";
import { useIntl } from "react-intl";
import { SettingsPageTitle } from "@strapi/helper-plugin";
import { HeaderLayout } from "@strapi/design-system/Layout";
import getTrad from "../../utils/getTrad";

const OpenAiHeader = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <SettingsPageTitle
        name={formatMessage({
          id: getTrad("Settings.email.plugin.title"),
          defaultMessage: "Configuration",
        })}
      />
      <HeaderLayout
        id="title"
        title={formatMessage({
          id: getTrad("Settings.email.plugin.title"),
          defaultMessage: "Configuration",
        })}
        subtitle={formatMessage({
          id: getTrad("Settings.email.plugin.subTitle"),
          defaultMessage: "Open AI API Settings",
        })}
      />
    </>
  );
};

export default OpenAiHeader;
