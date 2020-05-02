import styled from "styled-components"
import { THEME } from "libraries/theme"
import { InputBase, IconButton } from "@material-ui/core"

export const Root = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${THEME.palette.background.default};
`

export const InputContainer = styled.div`
  margin: 1rem 1rem 0.25rem;
  display: flex;
`

export const Input = styled(InputBase)`
  font-size: 1rem;

  .MuiInputBase-input {
    padding: 0;
    height: 1.75rem;
    line-height: 1.75;
  }
`

export const Button = styled(IconButton)`
  transform: translateX(-1rem);
`