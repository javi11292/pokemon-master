import styled from "styled-components"
import { Button } from "@material-ui/core"
import { FixedSizeList } from "react-window"
import { THEME } from "libraries/theme"

export const Root = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr;
  
  > * {
    overflow: hidden;
    padding: 0.75rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
`

export const List = styled(FixedSizeList)`
  overflow-y: overlay !important;
  overflow-x: hidden !important;

  ${Row} {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 300ms;

    :hover {
      background: ${THEME.palette.background.paper};
    }
  }
`

export const Input = styled(Button)`
  color: ${THEME.palette.text.hint};
  background: ${THEME.palette.background.paper} !important;
  justify-content: start;
  text-transform: none;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: initial;
  margin: 1rem 1rem 0.25rem;
  padding: 0;
`