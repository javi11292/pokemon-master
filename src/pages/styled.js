import styled from "styled-components"
import { Paper } from "@material-ui/core"

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
    padding: 0.5rem;
    border-bottom: 1px solid grey;
  }
`