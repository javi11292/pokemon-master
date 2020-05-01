import styled from "styled-components"
import { Paper, InputBase } from "@material-ui/core"
import { FixedSizeList } from "react-window"

export const Root = styled.div`
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
  overflow-x: overlay !important;
  overflow-y: hidden;
`

export const InputContainer = styled(Paper)`
  display: flex;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid transparent;
  transition: border-color 300ms;

  :focus-within {
    border-color: lightgrey;
  }
`

export const Input = styled(InputBase)`
  flex: 1;

  .MuiInputBase-input {
    padding: 0;
  }
`