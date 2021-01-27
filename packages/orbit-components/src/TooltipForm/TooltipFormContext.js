// @flow
import * as React from "react";

type Context = {|
  +customContainerPos: number,
  +customContainerOffset: number,
  +customArrowAlign: number,
  +inputWidth: ?number,
|};

export const TooltipFormContext: React.Context<Context> = React.createContext({
  customContainerPos: 0,
  customContainerOffset: 0,
  customArrowAlign: 0,
  inputWidth: 0,
});

type Props = {|
  +children: React.Node,
  ...Context,
|};

export const TooltipFormContextProvider = ({
  children,
  customContainerOffset,
  customContainerPos,
  customArrowAlign,
  inputWidth,
}: Props) => {
  return (
    <TooltipFormContext.Provider
      value={{ customContainerOffset, customContainerPos, customArrowAlign, inputWidth }}
    >
      {children}
    </TooltipFormContext.Provider>
  );
};

export const useTooltipForm = () => React.useContext(TooltipFormContext);
