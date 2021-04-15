import React from "react";
import styled from "styled-components";

interface Props {
  src: string;
  maxHeight: number;
}

const StyledIframe = styled.iframe<Omit<Props, "src">>`
  ${({ theme, maxHeight }) => `
    box-shadow: ${theme.orbit.boxShadowRaised};
    height: 100%;
    max-height: ${maxHeight}px;
    width: 100%;
    border-radius: ${theme.orbit.borderRadiusLarge};
  `}
`;

const Frame = ({ src, maxHeight }: Props) => {
  return <StyledIframe maxHeight={maxHeight} src={src} loading="lazy" />;
};

export default Frame;
