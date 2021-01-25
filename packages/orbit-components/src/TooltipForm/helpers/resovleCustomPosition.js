// @flow
const resolveCustomPositions = (align?: string, isIcon?: boolean, isInline?: boolean) => {
  if (align === "start") {
    return { pos: !isIcon ? 4 : 0, offset: !isInline ? 10 : 0, arrow: !isInline ? 2 : 0 };
  }

  return { pos: 0, offset: 0, arrow: 0 };
};

export default resolveCustomPositions;
