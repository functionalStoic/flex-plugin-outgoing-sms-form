import React from "react";
import { FlexPlugin } from "flex-plugin";
import SendSMS from "./components/SendSMS";
const PLUGIN_NAME = "JasonBotPlugin";

export default class JasonBotPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.AgentDesktopView.Panel1.Content.add(
      <SendSMS key="daily-special-sms" manager={manager} />,
      { sortOrder: -1 }
    );
  }
}
