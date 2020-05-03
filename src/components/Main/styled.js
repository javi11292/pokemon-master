import styled, { keyframes } from "styled-components"

const appear = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const Root = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  animation: ${appear} 300ms;
`