// @flow
import React, { useRef } from "react";
import styled from "styled-components";

import TooltipPrimitive from "../primitives/TooltipPrimitive";
import defaultTheme from "../defaultTheme";
import resolveTooltipPosition from "./helpers/resolveTooltipPosition";
import useDimensions from "./hooks/useDimensions";
import resolveCustomPosition from "./helpers/resovleCustomPosition";

import type { Props } from "./index";

const StyledFormFeedbackTooltip = styled.div`
  position: absolute;
  ${resolveTooltipPosition};
`;

StyledFormFeedbackTooltip.defaultProps = {
  theme: defaultTheme,
};

const TooltipForm = ({
  iconRef,
  tooltipShown,
  preferredPosition = "top",
  preferredAlign = "start",
  dataTest,
  error,
  help,
  inlineLabel,
}: Props) => {
  const contentRef = useRef(null);
  const { iconBounding } = useDimensions({ iconBoundingRef: iconRef }, inlineLabel);
  const getPos = resolveCustomPosition(preferredAlign, Boolean(iconBounding), inlineLabel);

  return (
    <StyledFormFeedbackTooltip
      ref={contentRef}
      data-test={dataTest}
      iconBounding={iconBounding}
      inlineLabel={inlineLabel}
      position="top"
      aria-live="polite"
    >
      {help && !error && (
        <TooltipPrimitive
          preferredPosition={preferredPosition}
          preferredAlign={preferredAlign}
          content={help}
          help={!!help}
          customContainerPos={getPos.pos}
          customContainerOffset={getPos.offset}
          customArrowAlign={getPos.arrow}
          tooltipShown={tooltipShown}
        />
      )}
      {error && (
        <TooltipPrimitive
          preferredPosition={preferredPosition}
          preferredAlign={preferredAlign}
          content={error}
          error={!!error}
          customContainerPos={getPos.pos}
          customContainerOffset={getPos.offset}
          customArrowAlign={getPos.arrow}
          tooltipShown={tooltipShown}
        />
      )}
    </StyledFormFeedbackTooltip>
  );
};

export default TooltipForm;
