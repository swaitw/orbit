// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, select } from "@storybook/addon-knobs";

import RenderInRtl from "../utils/rtl/RenderInRtl";
import { ALIGN, JUSTIFY, SPACING } from "./consts";

import Inline from "./index";

const PlaceHolder = ({ height = 50 }) => {
  return <div style={{ width: "50px", height: `${height}px`, background: "grey" }} />;
};

const dataTest = "test";

const TestChildrens = () => {
  return (
    <>
      <PlaceHolder />
      <PlaceHolder height={60} />
      <PlaceHolder height={70} />
      <PlaceHolder height={80} />
      <PlaceHolder height={90} />
      <PlaceHolder height={100} />
    </>
  );
};

storiesOf("Inline", module)
  .add(
    "Default",
    () => {
      const spacing = select("spacing", SPACING, SPACING[1]);
      return (
        <Inline spacing={spacing} dataTest={dataTest}>
          <TestChildrens />
        </Inline>
      );
    },
    {
      info:
        "This is the default configuration of this component. Visit Orbit.Kiwi for more detailed guidelines.",
    },
  )
  .add(
    "Playground",
    () => {
      const as = text("As", "div");
      const align = select("align", ALIGN, ALIGN[0]);
      const justify = select("justify", JUSTIFY, JUSTIFY[0]);
      const spacing = select("spacing", SPACING, SPACING[1]);

      return (
        <Inline as={as} align={align} justify={justify} dataTest={dataTest} spacing={spacing}>
          <TestChildrens />
        </Inline>
      );
    },
    {
      info: "Some description about this type of component. ",
    },
  )
  .add(
    "RTL",
    () => {
      const spacing = select("spacing", SPACING, SPACING[1]);
      return (
        <RenderInRtl>
          <Inline spacing={spacing} dataTest={dataTest}>
            <TestChildrens />
          </Inline>
        </RenderInRtl>
      );
    },
    {
      info: "This is a preview of this component in RTL setup.",
    },
  );
