// @flow
import React, { useRef } from "react";
import styled from "styled-components";

import { TooltipFormContextProvider } from "./TooltipFormContext";
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
  inputRef,
  tooltipShown,
  preferredPosition = "top",
  preferredAlign = "start",
  dataTest,
  error,
  help,
  inlineLabel,
}: Props) => {
  const contentRef = useRef(null);
  const { iconBounding, inputBounding: input } = useDimensions(
    { iconBoundingRef: iconRef, inputRef },
    inlineLabel,
  );

  const getPos = resolveCustomPosition(
    preferredAlign,
    Boolean(iconBounding),
    inlineLabel,
    input?.height,
  );

  return (
    <StyledFormFeedbackTooltip
      ref={contentRef}
      data-test={dataTest}
      iconBounding={iconBounding}
      inlineLabel={inlineLabel}
      position="top"
      aria-live="polite"
    >
      <TooltipFormContextProvider {...getPos} inputWidth={input?.width}>
        {help && !error && (
          <TooltipPrimitive
            preferredPosition={preferredPosition}
            preferredAlign={preferredAlign}
            content={help}
            help={!!help}
            tooltipShown={tooltipShown}
          />
        )}
        {error && (
          <TooltipPrimitive
            preferredPosition={preferredPosition}
            preferredAlign={preferredAlign}
            content={error}
            error={!!error}
            tooltipShown={tooltipShown}
          />
        )}
      </TooltipFormContextProvider>
    </StyledFormFeedbackTooltip>
  );
};

export default TooltipForm;
