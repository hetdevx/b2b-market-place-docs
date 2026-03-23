import React from "react";
import { Redirect } from "@docusaurus/router";

export default function LegacyOverviewRedirect(): JSX.Element {
  return <Redirect to="/docs/overview/" />;
}
