// @flow
import { useEffect, useState } from "react";

import boundingClientRect from "../../utils/boundingClientRect";
import type { UseDimensions } from "./useDimensions";
import debounce from "../../utils/debounce";

const defaultPositions = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  pureTop: 0,
  pureLeft: 0,
  pureRight: 0,
  pureBottom: 0,
};

const useDimensions: UseDimensions = ({ iconBoundingRef }) => {
  const [dimensions, setDimensions] = useState({
    set: false,
    iconBounding: {
      ...defaultPositions,
    },
  });

  useEffect(() => {
    const calculateDimensions = () => {
      const iconBounding = boundingClientRect(iconBoundingRef);

      setDimensions({
        set: true,
        iconBounding,
      });
    };

    calculateDimensions();

    window.addEventListener("resize", debounce(calculateDimensions, 100));
    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return dimensions;
};

export default useDimensions;
