import * as React from "react";
import loadable from "@loadable/component";
import { Loading } from "@kiwicom/orbit-components";

const Frame = loadable(() => import("./Frame"), {
  fallback: <Loading loading type="inlineLoader" text="Loading ..." />,
});

interface Props {
  exampleId: string;
  maxHeight?: number;
}

const ReactExample = ({ exampleId, maxHeight = 200 }: Props) => {
  const [src, setSrc] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined")
      setSrc(`${window.location.origin}/examples/${exampleId.toLowerCase()}`);
  }, []);

  return src ? <Frame src={src} maxHeight={maxHeight} /> : null;
};

export default ReactExample;
