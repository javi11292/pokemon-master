import styled from "styled-components"
import { Paper } from "@material-ui/core"
import { FixedSizeList } from "react-window"

export const Root = styled(Paper)`
  height: 100%;
  display: flex;
  flex-direction: column;
  white-space: nowrap;

  > :nth-child(1) {
    font-weight: 700;
  }

  > :nth-child(2) {
    flex: 1;
  }
`

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 2fr;

  > * {
    overflow: hidden;
    padding: 0.75rem;
    border-bottom: 1px solid grey;
  }
`

export const List = styled(FixedSizeList)`
  overflow: overlay !important;
`