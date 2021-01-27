// @flow
const resolveCustomPositions = (
  align?: string,
  isIcon?: boolean,
  isInline?: boolean,
  inputHeight?: number,
) => {
  if (align === "start") {
    const arrowInlineSize = inputHeight === 44 ? 12 : 11;

    return {
      customContainerPos: !isIcon ? 4 : 0,
      customContainerOffset: !isInline ? 10 : 0,
      customArrowAlign: !isInline ? 2 : arrowInlineSize,
    };
  }

  return { customContainerPos: 0, customContainerOffset: 0, customArrowAlign: 0 };
};

export default resolveCustomPositions;
