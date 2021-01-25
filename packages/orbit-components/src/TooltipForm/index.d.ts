// Type definitions for @kiwicom/orbit-components
// Project: http://github.com/kiwicom/orbit

import * as React from "react";
import * as Common from "../common/common";
import { Dimensions as PositionRaw } from "../utils/boundingClientRect";

type Position = "right" | "left" | "top" | "bottom";
type Align = "center" | "start" | "end";

export interface Props extends Common.Global, Common.SpaceAfter {
  readonly error?: React.ReactNode;
  readonly help?: React.ReactNode;
  readonly isInline?: boolean;
  readonly preferredPosition?: Position;
  readonly preferredAlign?: Align;
  readonly iconRef?: Common.Ref;
}

export interface Dimensions {
  readonly set: boolean;
  readonly bounding: PositionRaw;
  readonly iconBounding: PositionRaw;
}

declare const TooltipForm: React.FC<Props>;
export { TooltipForm, TooltipForm as default };
