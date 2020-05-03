import styled, { keyframes } from "styled-components"
import { Typography } from "@material-ui/core"

const expand = keyframes`
  from {
    transform: scaleX(0);
    background: rgb(255,0,0)
  }
`

function getBackground(value) {
  const module = value % 50 / 50

  if (value < 50) {
    return [200, 200 * module, 0].join(",")
  } else if (value < 100) {
    return [200 - 200 * module, 200, 0].join(",")
  } else {
    return [0, 200, 0].join(",")
  }
}

export const VideoContainer = styled.div`
  width: 100%;
  height: 25%;
  background: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: black;

  video {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`

export const Stats = styled.div`
  display: grid;
  padding: 0.75rem;
`

export const Bar = styled.div`
  margin: 0.75rem;
  border: 1px solid grey;
  border-radius: 0.35rem;
  overflow: hidden;
  position: relative;

  > span {
    color: black;
    font-size: 0.75rem;
    position: absolute;
    padding: 0.25rem;
    font-weight: 500;
    top: 50%;
    right: 0.25rem;
    transform: translateY(-50%);
  }

  > div {
    transform-origin: left;
    height: 100%;
    background: ${props => `rgb(${getBackground(props.value)})`};
    width: ${props => props.value}%;
    animation: ${expand} 750ms;
  }
`

export const Name = styled(Typography)`
  margin: 0.5rem;
`