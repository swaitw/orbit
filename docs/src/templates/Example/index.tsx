import React from "react";
import { LiveProvider, LiveEditor } from "react-live";
import { graphql } from "gatsby";
import styled, { css } from "styled-components";
import dracula from "prism-react-renderer/themes/dracula";
import * as Components from "@kiwicom/orbit-components";
import * as Icons from "@kiwicom/orbit-components/lib/icons";
import defaultTheme from "@kiwicom/orbit-components/lib/defaultTheme";

import Board from "./Board";
import Preview from "./Preview";

interface Scope {
  name: string;
  path: string;
  default: boolean;
}

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100%;
`;

interface Props {
  data: {
    file: {
      id: string;

      fields: {
        example_id: string;
        example: string;
        scope: Scope[];
      };
    };
  };
}

const StyledEditor = styled(LiveEditor)`
  ${({ theme }) => `
    border-radius: 0 0 ${theme.orbit.borderRadiusLarge} ${theme.orbit.borderRadiusLarge};
  `};
`;

export default function Example({ data }: Props) {
  const [isEditorOpened, setOpenEditor] = React.useState(false);

  const { fields } = data.file;

  const modules = fields.scope.reduce((acc, { name: moduleName, path }) => {
    if (path.match(/@kiwicom\/orbit-components\/icons/)) {
      return {
        ...acc,
        [moduleName]: Icons[moduleName],
      };
    }
    return {
      ...acc,
      [moduleName]: Components[moduleName],
    };
  }, {});

  const scopeOutput = fields.scope
    .map(({ path, name: moduleName, default: isDefault }) => {
      if (isDefault) return `import ${moduleName} from ${path}`;
      return `import { ${moduleName} }  from ${path}`;
    })
    .join("\n");

  return (
    <Components.ThemeProvider theme={defaultTheme}>
      <StyledWrapper>
        <LiveProvider code={fields.example} scope={{ ...modules, styled, css }} theme={dracula}>
          <Preview />
          <Board
            isEditorOpened={isEditorOpened}
            onOpenEditor={() => setOpenEditor(!isEditorOpened)}
            code={[scopeOutput, fields.example].join("\n\n")}
          />
          {isEditorOpened && <StyledEditor />}
        </LiveProvider>
      </StyledWrapper>
    </Components.ThemeProvider>
  );
}

export const query = graphql`
  query($id: String) {
    file(id: { eq: $id }) {
      id
      fields {
        example
        example_id
        scope {
          path
          default
          name
        }
      }
    }
  }
`;
