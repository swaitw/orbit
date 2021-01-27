// @flow
import { css } from "styled-components";

import tooltipSize from "./tooltipSize";
import type { ResolveWidth } from "./resolveWidth.js.flow";

const resolveWidth: ResolveWidth = ({ inputWidth, contentWidth, size }) => {
  if (inputWidth && contentWidth >= inputWidth) {
    return css`
      width: 100%;
      max-width: ${inputWidth}px;
    `;
  }

  return css`
    width: auto;
    max-width: ${tooltipSize(size)}px;
  `;
};

export default resolveWidth;
